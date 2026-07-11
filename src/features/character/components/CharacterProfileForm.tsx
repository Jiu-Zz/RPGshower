import type { CharacterProfile } from "../characterTypes";

// 目前允许通过基础表单编辑的 profile 字段。
export type EditableProfileField = "name" | "title" | "summary";

type CharacterProfileFormProps = {
  profile: CharacterProfile;

  // 子组件不直接修改状态，而是通知父组件发生了什么变化。
  onFieldChange: (field: EditableProfileField, value: string) => void;
};

export function CharacterProfileForm({
  profile,
  onFieldChange,
}: CharacterProfileFormProps) {
  return (
    <>
      <div className="form-field">
        <label htmlFor="character-name">角色名称</label>
        <input
          id="character-name"
          type="text"
          value={profile.name}
          onChange={(event) => onFieldChange("name", event.currentTarget.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="character-title">角色称号</label>
        <input
          id="character-title"
          type="text"
          value={profile.title}
          onChange={(event) =>
            onFieldChange("title", event.currentTarget.value)
          }
        />
      </div>

      <div className="form-field">
        <label htmlFor="character-summary">角色简介</label>
        <textarea
          id="character-summary"
          rows={5}
          value={profile.summary}
          onChange={(event) =>
            onFieldChange("summary", event.currentTarget.value)
          }
        />
      </div>
    </>
  );
}
