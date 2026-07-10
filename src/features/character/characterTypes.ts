// 资源条可用的颜色。
// 这里的值要和 CSS 类名对应，比如 red 对应 resource-fill-red。
export type ResourceColor =
  | "red"
  | "blue"
  | "green"
  | "amber"
  | "violet"
  | "slate";

// 角色头部信息：名字、称号、头像文字、简介、标签。
export type CharacterProfile = {
  name: string;
  title: string;
  avatarText: string;
  summary: string;
  tags: string[];
};

// 角色基础档案信息。
export type CharacterBasics = {
  species: string;
  className: string;
  level: string;
  origin: string;
  alignment: string;
};

// 角色资源，比如生命、法力、理智。
export type CharacterResource = {
  id: string;
  label: string;
  current: number;
  max: number;
  color: ResourceColor;
};

// 角色属性，比如力量、敏捷、智力。
export type CharacterAttribute = {
  id: string;
  label: string;
  value: number | string;
};

// 装备条目。
export type CharacterEquipment = {
  id: string;
  name: string;
  type: string;
  description: string;
  equipped: boolean;
  tags: string[];
};

// 技能条目。
export type CharacterSkill = {
  id: string;
  name: string;
  level: string;
  cost: string;
  description: string;
  tags: string[];
};

// 完整角色数据结构。
// 后续 JSON 导入的数据，最终也应该符合这个形状。
export type Character = {
  schemaVersion: string;
  id: string;
  profile: CharacterProfile;
  basics: CharacterBasics;
  resources: CharacterResource[];
  attributes: CharacterAttribute[];
  equipment: CharacterEquipment[];
  skills: CharacterSkill[];
};
