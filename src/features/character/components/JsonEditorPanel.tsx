import { useState } from "react";
import {
  parseCharacterJson,
  serializeCharacter,
} from "../characterData";
import type { Character } from "../characterTypes";

type JsonEditorPanelProps = {
  character: Character;
  onCharacterChange: (character: Character) => void;
};

export function JsonEditorPanel({
  character,
  onCharacterChange,
}: JsonEditorPanelProps) {
  const [jsonText, setJsonText] = useState(() => serializeCharacter(character));
  const [errors, setErrors] = useState<string[]>([]);
  const [applied, setApplied] = useState(false);
  const synchronized = jsonText === serializeCharacter(character);

  function handleSync() {
    setJsonText(serializeCharacter(character));
    setErrors([]);
    setApplied(false);
  }

  function handleApply() {
    const result = parseCharacterJson(jsonText);

    if (!result.success) {
      setErrors(result.messages);
      setApplied(false);
      return;
    }

    const normalizedJson = serializeCharacter(result.data);
    setErrors([]);
    setApplied(true);
    setJsonText(normalizedJson);
    onCharacterChange(result.data);
  }

  return (
    <section className="json-editor-panel">
      <div className="json-editor-heading">
        <label htmlFor="character-json">完整角色 JSON</label>
        <span className={synchronized ? "sync-status synced" : "sync-status"}>
          {synchronized ? "已同步" : "内容未同步"}
        </span>
      </div>

      <textarea
        id="character-json"
        className="json-textarea"
        value={jsonText}
        spellCheck={false}
        onChange={(event) => {
          setJsonText(event.currentTarget.value);
          setErrors([]);
          setApplied(false);
        }}
      />

      {errors.length > 0 ? (
        <div className="json-message error" role="alert">
          <strong>无法应用 JSON</strong>
          <ul>
            {errors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {applied ? (
        <p className="json-message success" role="status">
          JSON 已应用到当前角色。
        </p>
      ) : null}

      <div className="json-editor-actions">
        <button type="button" onClick={handleSync} disabled={synchronized}>
          同步当前角色
        </button>
        <button type="button" className="primary-button" onClick={handleApply}>
          应用 JSON
        </button>
      </div>
    </section>
  );
}
