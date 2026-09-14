import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { sampleCharacter } from "./data/sampleCharacter";
import {
  downloadCharacterJson,
  parseCharacterJson,
} from "./features/character/characterData";
import type { Character } from "./features/character/characterTypes";
import { ArchivePage } from "./features/character/components/ArchivePage";
import { CharacterCard } from "./features/character/components/CharacterCard";
import { CharacterEditor } from "./features/character/components/CharacterEditor";
import {
  createRecord,
  loadCharacterLibrary,
  makeCopy,
  makeNewCharacter,
  saveCharacterLibrary,
  type CharacterRecord,
} from "./features/library/characterLibrary";

function App() {
  const [view, setView] = useState<"card" | "archive">("card");
  const [library, setLibrary] = useState<CharacterRecord[]>(() => {
    const saved = loadCharacterLibrary();
    return saved.length > 0 ? saved : [createRecord(sampleCharacter)];
  });
  const [activeId, setActiveId] = useState(() => {
    const saved = loadCharacterLibrary();
    return saved[0]?.character.id ?? sampleCharacter.id;
  });
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeRecord = library.find((record) => record.character.id === activeId) ?? library[0];
  const character = activeRecord.character;

  useEffect(() => {
    saveCharacterLibrary(library);
  }, [library]);

  function handleOpenImportFile() {
    setImportError(null);
    fileInputRef.current?.click();
  }

  async function handleImportJson(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    try {
      const result = parseCharacterJson(await file.text());
      if (!result.success) {
        setImportError(`导入失败：${result.messages.join("；")}`);
        return;
      }

      setLibrary((current) => {
        const existingIndex = current.findIndex(
          (record) => record.character.id === result.data.id,
        );
        const nextRecord = createRecord(result.data);
        if (existingIndex === -1) return [...current, nextRecord];
        return current.map((record, index) =>
          index === existingIndex ? nextRecord : record,
        );
      });
      setActiveId(result.data.id);
      setImportError(null);
    } catch (error) {
      console.error("导入 JSON 失败：", error);
      setImportError("导入失败：文件无法读取。");
    } finally {
      input.value = "";
    }
  }

  function handleExportJson() {
    downloadCharacterJson(character);
  }

  function handleCharacterChange(nextCharacter: Character) {
    setLibrary((current) =>
      current.map((record) =>
        record.character.id === activeId ? createRecord(nextCharacter, record.archived) : record,
      ),
    );
    setImportError(null);
  }

  function handleNewCharacter() {
    const nextCharacter = makeNewCharacter(sampleCharacter, String(Date.now()));
    setLibrary((current) => [...current, createRecord(nextCharacter)]);
    setActiveId(nextCharacter.id);
    setImportError(null);
  }

  function handleDuplicateCharacter() {
    const nextCharacter = makeCopy(character, String(Date.now()));
    setLibrary((current) => [...current, createRecord(nextCharacter)]);
    setActiveId(nextCharacter.id);
    setImportError(null);
  }

  function handleToggleArchive() {
    setLibrary((current) =>
      current.map((record) =>
        record.character.id === activeId
          ? createRecord(record.character, !record.archived)
          : record,
      ),
    );
  }

  function handleDeleteCharacter() {
    if (library.length === 1) {
      setImportError("资料库至少需要保留一个角色。请先新建或导入其他角色。");
      return;
    }
    const remaining = library.filter((record) => record.character.id !== activeId);
    setLibrary(remaining);
    setActiveId(remaining[0].character.id);
    setImportError(null);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">通用角色展示器</p>
          <h1>RPGshower</h1>
        </div>

        <div className="topbar-actions">
          <label className="library-select-label" htmlFor="character-library-select">
            当前角色
          </label>
          <select
            id="character-library-select"
            className="library-select"
            value={activeId}
            onChange={(event) => setActiveId(event.currentTarget.value)}
          >
            {library.map((record) => (
              <option key={record.character.id} value={record.character.id}>
                {record.character.profile.name}{record.archived ? "（已归档）" : ""}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleNewCharacter}>新建</button>
          <button type="button" onClick={handleDuplicateCharacter}>复制</button>
          <button type="button" onClick={handleToggleArchive}>
            {activeRecord.archived ? "恢复" : "归档"}
          </button>
          <button type="button" onClick={handleDeleteCharacter}>删除</button>
          <div className="view-switch" aria-label="切换角色视图" role="group">
            <button
              type="button"
              className={view === "card" ? "view-tab active" : "view-tab"}
              aria-pressed={view === "card"}
              onClick={() => setView("card")}
            >
              角色卡
            </button>
            <button
              type="button"
              className={view === "archive" ? "view-tab active" : "view-tab"}
              aria-pressed={view === "archive"}
              onClick={() => setView("archive")}
            >
              档案
            </button>
          </div>

          <button type="button" onClick={handleOpenImportFile}>导入JSON</button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImportJson}
            hidden
          />
          <button type="button" onClick={handleExportJson}>导出JSON</button>
        </div>
      </header>

      <section className="workspace">
        <CharacterEditor
          character={character}
          importError={importError}
          onCharacterChange={handleCharacterChange}
        />
        <section
          className="preview-panel"
          aria-label={view === "card" ? "角色卡预览" : "角色档案预览"}
        >
          {view === "card" ? (
            <CharacterCard character={character} />
          ) : (
            <ArchivePage archive={character.archive} />
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
