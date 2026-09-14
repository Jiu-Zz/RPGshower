import { parseCharacterJson } from "../character/characterData.ts";
import type { Character } from "../character/characterTypes";

const STORAGE_KEY = "rpgshower.character-library.v1";

export type CharacterRecord = {
  character: Character;
  archived: boolean;
  updatedAt: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function createRecord(character: Character, archived = false): CharacterRecord {
  return { character, archived, updatedAt: new Date().toISOString() };
}

export function loadCharacterLibrary(storage: Pick<Storage, "getItem"> = localStorage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return [] as CharacterRecord[];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [] as CharacterRecord[];

    return parsed.flatMap((item): CharacterRecord[] => {
      if (!isRecord(item) || !isRecord(item.character)) return [];
      const result = parseCharacterJson(JSON.stringify(item.character));
      if (!result.success) return [];
      return [
        createRecord(
          result.data,
          item.archived === true,
        ),
      ];
    });
  } catch {
    return [] as CharacterRecord[];
  }
}

export function saveCharacterLibrary(
  records: CharacterRecord[],
  storage: Pick<Storage, "setItem"> = localStorage,
) {
  storage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function makeCopy(character: Character, suffix: string): Character {
  const copy = structuredClone(character);
  copy.id = `${character.id}-${suffix}`;
  copy.profile.name = `${character.profile.name}（副本）`;
  return copy;
}

export function makeNewCharacter(template: Character, suffix: string): Character {
  const character = structuredClone(template);
  character.id = `character-${suffix}`;
  character.profile = {
    ...character.profile,
    name: "新角色",
    title: "未命名角色",
    avatarText: "新",
    summary: "在这里写下角色简介。",
    tags: [],
  };
  character.archive = {
    background: "",
    appearance: "",
    personality: "",
    goals: [],
    relationships: [],
    timeline: [],
    notes: "",
  };
  character.extensions = {};
  return character;
}

export function getStorageKey() {
  return STORAGE_KEY;
}
