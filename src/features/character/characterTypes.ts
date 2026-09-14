import type { z } from "zod";
import {
  characterArchiveSchema,
  characterAttributeSchema,
  characterBasicsSchema,
  characterEquipmentSchema,
  characterExtensionsSchema,
  characterProfileSchema,
  characterResourceSchema,
  characterRelationshipSchema,
  characterSchema,
  characterSkillSchema,
  characterTimelineEventSchema,
  resourceColorSchema,
} from "./characterSchema";

// 根据 Zod schema 自动推导对应的 TypeScript 类型。
// 以后修改 schema 时，这些类型也会自动更新。
export type ResourceColor = z.infer<typeof resourceColorSchema>;

export type CharacterProfile = z.infer<typeof characterProfileSchema>;

export type CharacterBasics = z.infer<typeof characterBasicsSchema>;

export type CharacterResource = z.infer<typeof characterResourceSchema>;

export type CharacterAttribute = z.infer<typeof characterAttributeSchema>;

export type CharacterEquipment = z.infer<typeof characterEquipmentSchema>;

export type CharacterSkill = z.infer<typeof characterSkillSchema>;

export type CharacterRelationship = z.infer<typeof characterRelationshipSchema>;

export type CharacterTimelineEvent = z.infer<typeof characterTimelineEventSchema>;

export type CharacterArchive = z.infer<typeof characterArchiveSchema>;

export type CharacterExtensions = z.infer<typeof characterExtensionsSchema>;

export type Character = z.infer<typeof characterSchema>;
