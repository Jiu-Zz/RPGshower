import type { Character } from "./characterTypes.ts";

export type EditableProfileField = "name" | "title" | "summary";

export type EditableBasicsField =
  | "species"
  | "className"
  | "level"
  | "origin"
  | "alignment";

export function updateProfileField(
  character: Character,
  field: EditableProfileField,
  value: string,
): Character {
  return {
    ...character,
    profile: { ...character.profile, [field]: value },
  };
}

export function updateBasicsField(
  character: Character,
  field: EditableBasicsField,
  value: string,
): Character {
  return {
    ...character,
    basics: { ...character.basics, [field]: value },
  };
}

export function updateResourceValue(
  character: Character,
  resourceId: string,
  field: "current" | "max",
  value: number,
): Character {
  if (!Number.isFinite(value)) {
    return character;
  }

  return {
    ...character,
    resources: character.resources.map((resource) => {
      if (resource.id !== resourceId) {
        return resource;
      }

      if (field === "current") {
        return {
          ...resource,
          current: Math.min(Math.max(value, 0), resource.max),
        };
      }

      const max = Math.max(value, 0);
      return {
        ...resource,
        current: Math.min(resource.current, max),
        max,
      };
    }),
  };
}

export function updateAttributeValue(
  character: Character,
  attributeId: string,
  rawValue: string,
): Character {
  return {
    ...character,
    attributes: character.attributes.map((attribute) => {
      if (attribute.id !== attributeId) {
        return attribute;
      }

      if (typeof attribute.value === "number") {
        const numericValue = Number(rawValue);
        return Number.isNaN(numericValue)
          ? attribute
          : { ...attribute, value: numericValue };
      }

      return { ...attribute, value: rawValue };
    }),
  };
}
