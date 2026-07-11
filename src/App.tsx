import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import "./App.css";
import { sampleCharacter } from "./data/sampleCharacter";
import type { Character } from "./features/character/characterTypes";
import { CharacterCard } from "./features/character/components/CharacterCard";

function App() {
  // character 是当前角色，setCharacter 用来替换当前角色。
  const [character, setCharacter] = useState<Character>(sampleCharacter);
  // 保存隐藏文件输入框对应的 HTML 元素。
  // 初始阶段元素还没有渲染，所以值是 null。
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 点击导入按钮时，模拟点击隐藏的文件输入框。
  function handleOpenImportFile() {
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

      // 暂时告诉 TypeScript：我们相信导入的数据符合 Character 类型。
      // 后续会使用 Zod 真正检查数据结构。
      const importedCharacter = parsedData as Character;

      // 更新 state 后，React 会重新渲染角色卡。
      setCharacter(importedCharacter);
    } catch (error) {
      // JSON 格式错误时，JSON.parse 会抛出异常。
      console.error("导入 JSON 失败：", error);
      window.alert("导入失败，请确认文件是有效的 JSON。");
    } finally {
      // 清空 input，允许用户连续选择同一个文件。
      input.value = "";
    }
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
        <aside>
          <h2>编辑区</h2>
          <p>后续会加入基础表单和 JSON 编辑器</p>
        </aside>
        <section className="preview-panel" aria-label="角色预览">
          <CharacterCard character={character} />
        </section>
      </section>
    </main>
  );
}

export default App;
