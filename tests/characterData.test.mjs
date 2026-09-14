import assert from "node:assert/strict";
import test from "node:test";
import {
  parseCharacterJson,
  serializeCharacter,
} from "../src/features/character/characterData.ts";
import {
  updateAttributeValue,
  updateBasicsField,
  updateProfileField,
  updateResourceValue,
} from "../src/features/character/characterUpdates.ts";
import { sampleCharacter } from "../src/data/sampleCharacter.ts";

test("JSON parsing distinguishes syntax errors", () => {
  const result = parseCharacterJson('{"schemaVersion":');
  assert.equal(result.success, false);
  assert.equal(result.kind, "syntax");
  assert.match(result.messages[0], /^JSON 语法错误：/);
});

test("JSON parsing reports every schema issue with a path", () => {
  const invalid = {
    ...sampleCharacter,
    profile: { ...sampleCharacter.profile, name: 42 },
    basics: { ...sampleCharacter.basics, species: false },
  };
  const result = parseCharacterJson(JSON.stringify(invalid));
  assert.equal(result.success, false);
  assert.equal(result.kind, "schema");
  assert.equal(result.messages.length, 2);
  assert.match(result.messages[0], /^profile\.name：/);
  assert.match(result.messages[1], /^basics\.species：/);
});

test("JSON parsing normalizes legacy data and serialization is stable", () => {
  const legacy = structuredClone(sampleCharacter);
  delete legacy.archive;
  delete legacy.extensions;
  const result = parseCharacterJson(JSON.stringify(legacy));
  assert.equal(result.success, true);
  assert.deepEqual(parseCharacterJson(serializeCharacter(result.data)), result);
});

test("character update helpers return updated copies", () => {
  const profile = updateProfileField(sampleCharacter, "name", "新名字");
  assert.equal(profile.profile.name, "新名字");
  assert.equal(sampleCharacter.profile.name, "艾琳");

  const basics = updateBasicsField(profile, "origin", "南境");
  assert.equal(basics.basics.origin, "南境");

  const resource = updateResourceValue(basics, "hp", "current", 20);
  assert.equal(resource.resources.find((item) => item.id === "hp")?.current, 20);

  const attribute = updateAttributeValue(resource, "strength", "15");
  assert.equal(attribute.attributes.find((item) => item.id === "strength")?.value, 15);
});

test("invalid numeric edits preserve the current character", () => {
  assert.equal(
    updateResourceValue(sampleCharacter, "hp", "current", Number.NaN),
    sampleCharacter,
  );
  const updated = updateAttributeValue(sampleCharacter, "strength", "not-a-number");
  assert.equal(updated.attributes.find((item) => item.id === "strength")?.value, 8);
});

test("resource updates clamp values and keep current within maximum", () => {
  const belowZero = updateResourceValue(sampleCharacter, "hp", "current", -5);
  assert.equal(belowZero.resources.find((item) => item.id === "hp")?.current, 0);

  const aboveMax = updateResourceValue(sampleCharacter, "hp", "current", 99);
  assert.equal(aboveMax.resources.find((item) => item.id === "hp")?.current, 45);

  const lowerMax = updateResourceValue(sampleCharacter, "hp", "max", 20.5);
  const hp = lowerMax.resources.find((item) => item.id === "hp");
  assert.equal(hp?.max, 20.5);
  assert.equal(hp?.current, 20.5);

  const negativeMax = updateResourceValue(sampleCharacter, "hp", "max", -1);
  const emptyHp = negativeMax.resources.find((item) => item.id === "hp");
  assert.equal(emptyHp?.max, 0);
  assert.equal(emptyHp?.current, 0);
});
