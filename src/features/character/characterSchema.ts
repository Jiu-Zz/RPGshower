import { z } from "zod";

// 资源条颜色
export const resourceColorSchema = z.enum([
  "red",
  "blue",
  "green",
  "amber",
  "violet",
  "slate",
]);

// 角色头部信息。
export const characterProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  avatarText: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
});

// 角色基础档案信息。
export const characterBasicsSchema = z.object({
  species: z.string(),
  className: z.string(),
  level: z.string(),
  origin: z.string(),
  alignment: z.string(),
});

// 角色资源，比如生命、法力和理智。
export const characterResourceSchema = z.object({
  id: z.string(),
  label: z.string(),
  current: z.number(),
  max: z.number(),
  color: resourceColorSchema,
});

// 角色属性的值既可以是数字，也可以是字符串。
export const characterAttributeSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.union([z.number(), z.string()]),
});

// 角色装备条目。
export const characterEquipmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  description: z.string(),
  equipped: z.boolean(),
  tags: z.array(z.string()),
});

// 角色技能条目。
export const characterSkillSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.string(),
  cost: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
});

// 将前面的小型 schema 组合成完整的角色数据结构。
export const characterSchema = z.object({
  schemaVersion: z.string(),
  id: z.string(),
  profile: characterProfileSchema,
  basics: characterBasicsSchema,

  // 数组中的每个元素也必须通过对应 schema 的检查。
  resources: z.array(characterResourceSchema),
  attributes: z.array(characterAttributeSchema),
  equipment: z.array(characterEquipmentSchema),
  skills: z.array(characterSkillSchema),
});
