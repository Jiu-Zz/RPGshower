import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import "./App.css";
import { sampleCharacter } from "./data/sampleCharacter";
import { characterSchema } from "./features/character/characterSchema";
import type { Character } from "./features/character/characterTypes";
import {
  CharacterBasicsForm,
  type EditableBasicsField,
} from "./features/character/components/CharacterBasicsForm";
import { CharacterCard } from "./features/character/components/CharacterCard";
import {
  CharacterProfileForm,
  type EditableProfileField,
} from "./features/character/components/CharacterProfileForm";

function App() {
  // character 是当前角色，setCharacter 用来替换当前角色。
  const [character, setCharacter] = useState<Character>(sampleCharacter);

  // 保存导入错误；null 表示当前没有错误。
  const [importError, setImportError] = useState<string | null>(null);

  // 保存隐藏文件输入框对应的 HTML 元素。
  // 初始阶段元素还没有渲染，所以值是 null。
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 点击导入按钮时，模拟点击隐藏的文件输入框。
  function handleOpenImportFile() {
    setImportError(null);
    fileInputRef.current?.click();
  }

  // 用户选择文件后，读取并导入角色数据。
  async function handleImportJson(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;

    // files 是用户选中的文件列表，这里只读取第一个文件。
    const file = input.files?.[0];

    // 用户可能打开选择器后又取消，因此需要检查文件是否存在。
    if (!file) {
      return;
    }

    try {
      // file.text() 会异步读取文件内容，结果是字符串。
      const jsonText = await file.text();

      // JSON.parse 将 JSON 字符串转换回 JavaScript 数据。
      const parsedData: unknown = JSON.parse(jsonText);

      // 使用 Zod 检查数据是否符合完整的角色结构。
      const validationResult = characterSchema.safeParse(parsedData);

      if (!validationResult.success) {
        // issues 中记录了字段位置、预期类型和实际问题。
        console.error("角色数据校验失败：", validationResult.error.issues);

        // 先显示第一个错误，避免一次展示太多信息。
        const firstIssue = validationResult.error.issues[0];
        const fieldPath = firstIssue?.path.join(".") || "未知字段";
        const issueMessage = firstIssue?.message ?? "数据结构不符合要求";

        setImportError(`导入失败：${fieldPath}，${issueMessage}`);
        return;
      }

      // 校验成功后，data 是经过 Zod 检查的角色数据。
      setImportError(null);
      setCharacter(validationResult.data);
    } catch (error) {
      // JSON 格式错误时，JSON.parse 会抛出异常。
      console.error("导入 JSON 失败：", error);
      setImportError("导入失败：文件无法读取或不是有效的 JSON。");
    } finally {
      // 清空 input，允许用户连续选择同一个文件。
      input.value = "";
    }
  }

  // 修改 profile 中的一个字符串字段。
  function updateProfileField(field: EditableProfileField, value: string) {
    setCharacter((currentCharacter) => ({
      ...currentCharacter,

      profile: {
        ...currentCharacter.profile,

        // [field] 会使用参数中的字段名称。
        [field]: value,
      },
    }));
  }

  // 修改 basics 中的一个字符串字段。
  function updateBasicsField(field: EditableBasicsField, value: string) {
    setCharacter((currentCharacter) => ({
      // 保留其他角色数据。
      ...currentCharacter,

      basics: {
        // 保留其他基础档案字段。
        ...currentCharacter.basics,
        [field]: value,
      },
    }));
  }

  // 修改某项资源的当前值或最大值。
  function updateResourceValue(
    resourceId: string,
    field: "current" | "max",
    value: number,
  ) {
    // 数字输入框为空时，valueAsNumber 会得到 NaN。
    if (Number.isNaN(value)) {
      return;
    }

    setCharacter((currentCharacter) => ({
      ...currentCharacter,

      resources: currentCharacter.resources.map((resource) => {
        if (resource.id !== resourceId) {
          return resource;
        }

        return {
          ...resource,

          // field 是 current 时修改当前值，是 max 时修改最大值。
          [field]: value,
        };
      }),
    }));
  }

  // 根据属性 id 修改某一项属性值。
  function updateAttributeValue(attributeId: string, rawValue: string) {
    setCharacter((currentCharacter) => ({
      ...currentCharacter,

      attributes: currentCharacter.attributes.map((attribute) => {
        if (attribute.id !== attributeId) {
          return attribute;
        }

        // 原值是数字时，继续保存为数字。
        if (typeof attribute.value === "number") {
          const numericValue = Number(rawValue);

          if (Number.isNaN(numericValue)) {
            return attribute;
          }

          return {
            ...attribute,
            value: numericValue,
          };
        }

        // 原值是字符串时，继续保存为字符串。
        return {
          ...attribute,
          value: rawValue,
        };
      }),
    }));
  }

  // 将当前角色数据转换成 JSON 文件并下载。
  function handleExportJson() {
    // null 表示不修改数据，2 表示使用两个空格格式化缩进。
    const jsonText = JSON.stringify(character, null, 2);

    // Blob 表示浏览器内存中的一份文件数据。
    const jsonBlob = new Blob([jsonText], {
      type: "application/json",
    });

    // 为内存中的文件创建一个临时下载地址。
    const downloadUrl = URL.createObjectURL(jsonBlob);

    // 临时创建一个链接，通过点击链接触发浏览器下载。
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = `${character.id}.json`;

    document.body.append(downloadLink);
    downloadLink.click();
    downloadLink.remove();

    // 下载触发后释放临时地址，避免一直占用内存。
    URL.revokeObjectURL(downloadUrl);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">通用角色展示器</p>
          <h1>RPGshower</h1>
        </div>

        <div className="topbar-actions">
          <button type="button" onClick={handleOpenImportFile}>
            导入JSON
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImportJson}
            hidden
          />
          <button type="button" onClick={handleExportJson}>
            导出JSON
          </button>
        </div>
      </header>

      <section className="workspace">
        <aside className="editor-panel">
          <h2>编辑区</h2>

          {/* 只有存在错误信息时才渲染错误提示。 */}
          {importError ? (
            <p className="import-error" role="alert">
              {importError}
            </p>
          ) : null}

          <div className="editor-form">
            <CharacterProfileForm
              profile={character.profile}
              onFieldChange={updateProfileField}
            />

            <CharacterBasicsForm
              basics={character.basics}
              onFieldChange={updateBasicsField}
            />
          </div>

          <div className="resource-editor">
            <h3>资源</h3>

            {/* 根据资源数组自动生成输入框。 */}
            {character.resources.map((resource) => (
              <div className="resource-edit-item" key={resource.id}>
                <h4>{resource.label}</h4>

                <div className="resource-value-grid">
                  <div className="form-field">
                    <label htmlFor={`resource-${resource.id}-current`}>
                      当前值
                    </label>

                    <input
                      id={`resource-${resource.id}-current`}
                      type="number"
                      value={resource.current}
                      onChange={(event) =>
                        updateResourceValue(
                          resource.id,
                          "current",
                          event.currentTarget.valueAsNumber,
                        )
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor={`resource-${resource.id}-max`}>
                      最大值
                    </label>

                    <input
                      id={`resource-${resource.id}-max`}
                      type="number"
                      value={resource.max}
                      onChange={(event) =>
                        updateResourceValue(
                          resource.id,
                          "max",
                          event.currentTarget.valueAsNumber,
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
                    type={
                      typeof attribute.value === "number" ? "number" : "text"
                    }
                    value={attribute.value}
                    onChange={(event) =>
                      updateAttributeValue(
                        attribute.id,
                        event.currentTarget.value,
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </aside>
        <section className="preview-panel" aria-label="角色预览">
          <CharacterCard character={character} />
        </section>
      </section>
    </main>
  );
}

export default App;
