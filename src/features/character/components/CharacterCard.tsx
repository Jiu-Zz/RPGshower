import type { Character } from "../characterTypes";
import { AttributeGrid } from "./AttributeGrid";
import { CharacterHeader } from "./CharacterHeader";
import { EquipmentList } from "./EquipmentList";
import { ResourceList } from "./ResourceList";
import { SkillList } from "./SkillList";

type CharacterCardProps = {
  // character 是完整角色数据。
  // CharacterCard 负责把它拆给下面的小组件。
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className="character-card">
      <CharacterHeader basics={character.basics} profile={character.profile} />

      {/* 资源区域 */}
      <ResourceList resources={character.resources}></ResourceList>

      <AttributeGrid attributes={character.attributes} />

      {/* 装备和技能区域 */}
      <section className="card-section two-column-section">
        <EquipmentList equipment={character.equipment} />
        <SkillList skills={character.skills} />
      </section>
    </article>
  );
}
