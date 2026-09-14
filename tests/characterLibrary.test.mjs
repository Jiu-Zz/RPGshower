import assert from "node:assert/strict";
import test from "node:test";
import { sampleCharacter } from "../src/data/sampleCharacter.ts";
import {
  createRecord,
  loadCharacterLibrary,
  makeCopy,
  makeNewCharacter,
  saveCharacterLibrary,
} from "../src/features/library/characterLibrary.ts";

function storageStub() {
  let value = null;
  return {
    getItem() {
      return value;
    },
    setItem(_key, next) {
      value = next;
    },
  };
}

test("character library round-trips records through storage", () => {
  const storage = storageStub();
  const records = [createRecord(sampleCharacter, true)];
  saveCharacterLibrary(records, storage);
  const loaded = loadCharacterLibrary(storage);
  assert.equal(loaded.length, 1);
  assert.equal(loaded[0].character.id, sampleCharacter.id);
  assert.equal(loaded[0].archived, true);
});

test("character library ignores malformed records", () => {
  const storage = storageStub();
  storage.setItem("ignored", JSON.stringify([{ character: { id: "bad" } }, "bad"]));
  assert.deepEqual(loadCharacterLibrary(storage), []);
});

test("new and copied characters get independent ids and editable defaults", () => {
  const fresh = makeNewCharacter(sampleCharacter, "1");
  const copy = makeCopy(sampleCharacter, "2");
  assert.equal(fresh.id, "character-1");
  assert.equal(fresh.profile.name, "新角色");
  assert.equal(copy.id, "ailin-wandering-mage-2");
  assert.notEqual(copy.profile.name, sampleCharacter.profile.name);
  assert.equal(sampleCharacter.profile.name, "艾琳");
});
