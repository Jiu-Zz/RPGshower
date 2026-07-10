import type { CharacterEquipment } from "../characterTypes";

type EquipmentListProps = {
  // equipment 是装备数组。
  equipment: CharacterEquipment[];
};

export function EquipmentList({ equipment }: EquipmentListProps) {
  return (
    <div>
      <h3>装备</h3>

      <ul className="item-list">
        {equipment.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>

            <span>
              {item.type}
              {item.equipped ? " · 已装备" : ""}
            </span>

            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
