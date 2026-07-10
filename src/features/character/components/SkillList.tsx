import type { CharacterSkill } from "../characterTypes";

type SkillListProps = {
  // skills 是技能数组。
  skills: CharacterSkill[];
};

export function SkillList({ skills }: SkillListProps) {
  return (
    <div>
      <h3>技能</h3>

      <ul className="item-list">
        {skills.map((skill) => (
          <li key={skill.id}>
            <strong>{skill.name}</strong>

            {/* 过滤空值后再拼接，避免出现多余的分隔符 */}
            <span>{[skill.level, skill.cost].filter(Boolean).join(" · ")}</span>

            <p>{skill.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
