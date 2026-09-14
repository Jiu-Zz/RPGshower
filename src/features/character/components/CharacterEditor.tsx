import { useState } from "react";
import type { Character } from "../characterTypes";
import {
  updateAttributeValue,
  updateBasicsField,
  updateProfileField,
  updateResourceValue,
} from "../characterUpdates";
import { CharacterBasicsForm } from "./CharacterBasicsForm";
import { CharacterProfileForm } from "./CharacterProfileForm";
import { JsonEditorPanel } from "./JsonEditorPanel";

type CharacterEditorProps = {
  character: Character;
  importError: string | null;
  onCharacterChange: (character: Character) => void;
};

export function CharacterEditor({
  character,
  importError,
  onCharacterChange,
}: CharacterEditorProps) {
  const [mode, setMode] = useState<"form" | "json">("form");

  return (
    <aside className="editor-panel">
      <div className="editor-panel-heading">
        <h2>编辑区</h2>
        <div className="editor-mode-switch" role="group" aria-label="编辑方式">
          <button
            type="button"
            className={mode === "form" ? "editor-mode active" : "editor-mode"}
            aria-pressed={mode === "form"}
            onClick={() => setMode("form")}
          >
            基础表单
          </button>
          <button
            type="button"
            className={mode === "json" ? "editor-mode active" : "editor-mode"}
            aria-pressed={mode === "json"}
            onClick={() => setMode("json")}
          >
            JSON
          </button>
        </div>
      </div>

      {importError ? (
        <p className="import-error" role="alert">
          {importError}
        </p>
      ) : null}

      <div hidden={mode !== "json"}>
        <JsonEditorPanel
          character={character}
          onCharacterChange={onCharacterChange}
        />
      </div>

      <div hidden={mode !== "form"}>
        <div className="basic-editor">
          <div className="editor-form">
            <CharacterProfileForm
              profile={character.profile}
              onFieldChange={(field, value) =>
                onCharacterChange(updateProfileField(character, field, value))
              }
            />

            <CharacterBasicsForm
              basics={character.basics}
              onFieldChange={(field, value) =>
                onCharacterChange(updateBasicsField(character, field, value))
              }
            />
          </div>

          <div className="resource-editor">
            <h3>资源</h3>
            {character.resources.map((resource) => (
              <div className="resource-edit-item" key={resource.id}>
                <h4>{resource.label}</h4>
                <div className="resource-value-grid">
                  <div className="form-field">
                    <label htmlFor={`resource-${resource.id}-current`}>当前值</label>
                    <input
                      id={`resource-${resource.id}-current`}
                      type="number"
                      min={0}
                      max={resource.max}
                      step="any"
                      value={resource.current}
                      onChange={(event) =>
                        onCharacterChange(
                          updateResourceValue(
                            character,
                            resource.id,
                            "current",
                            event.currentTarget.valueAsNumber,
                          ),
                        )
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor={`resource-${resource.id}-max`}>最大值</label>
                    <input
                      id={`resource-${resource.id}-max`}
                      type="number"
                      min={0}
                      step="any"
                      value={resource.max}
                      onChange={(event) =>
                        onCharacterChange(
                          updateResourceValue(
                            character,
                            resource.id,
                            "max",
                            event.currentTarget.valueAsNumber,
                          ),
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="attribute-editor">
            <h3>属性</h3>
            <div className="attribute-editor-grid">
              {character.attributes.map((attribute) => (
                <div className="form-field" key={attribute.id}>
                  <label htmlFor={`attribute-${attribute.id}`}>
                    {attribute.label}
                  </label>
                  <input
                    id={`attribute-${attribute.id}`}
                    type={typeof attribute.value === "number" ? "number" : "text"}
                    value={attribute.value}
                    onChange={(event) =>
                      onCharacterChange(
                        updateAttributeValue(
                          character,
                          attribute.id,
                          event.currentTarget.value,
                        ),
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
