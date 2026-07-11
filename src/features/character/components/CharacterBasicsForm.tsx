import type { CharacterBasics } from "../characterTypes";

// 基础档案表单允许编辑的字段。
export type EditableBasicsField =
  | "species"
  | "className"
  | "level"
  | "origin"
  | "alignment";

type CharacterBasicsFormProps = {
  basics: CharacterBasics;
  onFieldChange: (field: EditableBasicsField, value: string) => void;
};

export function CharacterBasicsForm({
  basics,
  onFieldChange,
}: CharacterBasicsFormProps) {
  return (
    <>
      <div className="form-field">
        <label htmlFor="character-species">种族</label>
        <input
          id="character-species"
          type="text"
          value={basics.species}
          onChange={(event) =>
            onFieldChange("species", event.currentTarget.value)
          }
        />
      </div>

      <div className="form-field">
        <label htmlFor="character-class">职业</label>
        <input
          id="character-class"
          type="text"
          value={basics.className}
          onChange={(event) =>
            onFieldChange("className", event.currentTarget.value)
          }
        />
      </div>

      <div className="form-field">
        <label htmlFor="character-level">等级</label>
        <input
          id="character-level"
          type="text"
          value={basics.level}
          onChange={(event) =>
            onFieldChange("level", event.currentTarget.value)
          }
        />
      </div>

      <div className="form-field">
        <label htmlFor="character-origin">出身</label>
        <input
          id="character-origin"
          type="text"
          value={basics.origin}
          onChange={(event) =>
            onFieldChange("origin", event.currentTarget.value)
          }
        />
      </div>

      <div className="form-field">
        <label htmlFor="character-alignment">阵营</label>
        <input
          id="character-alignment"
          type="text"
          value={basics.alignment}
          onChange={(event) =>
            onFieldChange("alignment", event.currentTarget.value)
          }
        />
      </div>
    </>
  );
}
