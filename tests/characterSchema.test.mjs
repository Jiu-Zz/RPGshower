import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { sampleCharacter } from "../src/data/sampleCharacter.ts";
import { characterSchema } from "../src/features/character/characterSchema.ts";

const emptyArchive = {
  background: "",
  appearance: "",
  personality: "",
  goals: [],
  relationships: [],
  timeline: [],
  notes: "",
};

test("sample character retains all fields after validation", () => {
  assert.deepEqual(characterSchema.parse(sampleCharacter), sampleCharacter);
});

test("legacy 0.1.0 files get a complete empty archive and extensions", () => {
  const legacy = structuredClone(sampleCharacter);
  delete legacy.archive;
  delete legacy.extensions;
  const parsed = characterSchema.parse(legacy);
  assert.deepEqual(parsed, { ...legacy, archive: emptyArchive, extensions: {} });
  assert.equal(Object.hasOwn(legacy, "archive"), false);
  parsed.archive.goals.push("new goal");
  assert.deepEqual(characterSchema.parse(legacy).archive, emptyArchive);
});

test("partial archives keep supplied values and fill absent fields", () => {
  const parsed = characterSchema.parse({
    ...sampleCharacter,
    archive: { background: "A background" },
  });
  assert.deepEqual(parsed.archive, { ...emptyArchive, background: "A background" });
});

test("unsupported or missing versions are rejected at schemaVersion", () => {
  for (const schemaVersion of [undefined, "", "0.2.0", "1.0.0", 1]) {
    const result = characterSchema.safeParse({ ...sampleCharacter, schemaVersion });
    assert.equal(result.success, false);
    assert.deepEqual(result.error.issues[0].path, ["schemaVersion"]);
  }
});

test("invalid archive fields and incomplete entries are rejected", () => {
  const cases = [
    [null, ["archive"]],
    [{ background: 123 }, ["archive", "background"]],
    [{ goals: "goal" }, ["archive", "goals"]],
    [{ relationships: [{ id: "mentor" }] }, ["archive", "relationships", 0, "name"]],
    [{ timeline: [{ id: "event", title: "Start" }] }, ["archive", "timeline", 0, "description"]],
  ];
  for (const [archive, path] of cases) {
    const result = characterSchema.safeParse({ ...sampleCharacter, archive });
    assert.equal(result.success, false);
    assert.deepEqual(result.error.issues[0].path, path);
  }
});

test("archive and nested extensions survive import-export-import", () => {
  const input = {
    ...sampleCharacter,
    extensions: {
      rules: { enabled: true, modifier: -2.5, spells: ["fire", null, { slots: 3 }] },
      label: "custom",
      empty: {},
      list: [],
    },
  };
  const imported = characterSchema.parse(JSON.parse(JSON.stringify(input)));
  const exported = JSON.stringify(imported, null, 2);
  assert.deepEqual(characterSchema.parse(JSON.parse(exported)), input);
});

test("extensions must be an object containing JSON values", () => {
  for (const extensions of [null, [], "text", { invalid: undefined }, { invalid: NaN }]) {
    assert.equal(characterSchema.safeParse({ ...sampleCharacter, extensions }).success, false);
  }
});

test("resources require nonnegative values within their maximum", () => {
  const invalidValues = [
    { current: -1, max: 10 },
    { current: 1, max: -1 },
    { current: 11, max: 10 },
  ];

  for (const values of invalidValues) {
    const result = characterSchema.safeParse({
      ...sampleCharacter,
      resources: [{ ...sampleCharacter.resources[0], ...values }],
    });
    assert.equal(result.success, false);
    assert.equal(result.error.issues[0].path[0], "resources");
  }

  const decimal = characterSchema.safeParse({
    ...sampleCharacter,
    resources: [{ ...sampleCharacter.resources[0], current: 1.5, max: 2.5 }],
  });
  assert.equal(decimal.success, true);
});

test("the design document JSON example matches the runtime schema", () => {
  const design = readFileSync(new URL(
    "../docs/superpowers/specs/2026-07-10-rpgshower-v0-design.md",
    import.meta.url,
  ), "utf8");
  const json = design.match(/```json\s*([\s\S]*?)```/);
  assert.ok(json, "Design document must contain a JSON example");
  const input = JSON.parse(json[1]);
  assert.deepEqual(characterSchema.parse(input), input);
});
