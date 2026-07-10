// 这是一个示例角色数据。
// 现在它还是写在代码里的对象，后续可以从 JSON 导入得到同样结构的数据。

import type { Character } from "../features/character/characterTypes";

export const sampleCharacter: Character = {
  // schemaVersion 用来标记数据结构版本。
  // 以后如果角色 JSON 格式升级，可以靠它判断如何兼容旧数据。
  schemaVersion: "0.1.0",

  // id 是角色的唯一标识，后续做多角色管理时会很有用。
  id: "ailin-wandering-mage",

  // profile 是角色展示时最核心的身份信息。
  profile: {
    name: "艾琳",
    title: "流浪法师",
    avatarText: "艾",
    summary:
      "一位寻找失落星图的年轻法师。她把旅途中的传闻、星象和古老符文都记录在随身笔记里。",
    tags: ["法师", "旅行者", "星象"],
  },

  // basics 是角色的基础档案信息。
  basics: {
    species: "人类",
    className: "法师",
    level: "5",
    origin: "北境",
    alignment: "中立善良",
  },

  // resources 是会变化的资源，比如生命、法力、理智、护盾等。
  resources: [
    {
      id: "hp",
      label: "生命",
      current: 32,
      max: 45,
      color: "red",
    },
    {
      id: "mp",
      label: "法力",
      current: 18,
      max: 30,
      color: "blue",
    },
  ],

  // attributes 是属性列表，后续可以适配不同规则系统。
  attributes: [
    { id: "strength", label: "力量", value: 8 },
    { id: "dexterity", label: "敏捷", value: 12 },
    { id: "constitution", label: "体质", value: 10 },
    { id: "intelligence", label: "智力", value: 17 },
    { id: "wisdom", label: "感知", value: 14 },
    { id: "charisma", label: "魅力", value: 11 },
  ],

  // equipment 是装备列表。
  equipment: [
    {
      id: "staff",
      name: "星纹法杖",
      type: "武器",
      description: "镶嵌着微光星石的长杖。",
      equipped: true,
      tags: ["法器"],
    },
    {
      id: "journal",
      name: "旧皮革笔记",
      type: "工具",
      description: "记录星象、传闻和未完成的地图。",
      equipped: false,
      tags: ["资料"],
    },
  ],

  // skills 是技能列表。
  skills: [
    {
      id: "starfire",
      name: "星火术",
      level: "熟练",
      cost: "3 法力",
      description: "召唤一束星火攻击目标。",
      tags: ["法术", "攻击"],
    },
    {
      id: "star-map-reading",
      name: "星图解读",
      level: "专家",
      cost: "",
      description: "根据星象和古地图推断道路、季节与异常现象。",
      tags: ["知识", "探索"],
    },
  ],
};
