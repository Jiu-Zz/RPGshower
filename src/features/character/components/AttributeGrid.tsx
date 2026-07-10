import type { CharacterAttribute } from "../characterTypes";

type AttributeGridProps = {
  // attributes 是属性数组，比如力量、敏捷、智力。
  attributes: CharacterAttribute[];
};

export function AttributeGrid({ attributes }: AttributeGridProps) {
  return (
    <section className="card-section">
      <h3>属性</h3>

      <div className="attribute-grid">
        {attributes.map((attribute) => (
          <div key={attribute.id}>
            <span>{attribute.label}</span>
            <strong>{attribute.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
