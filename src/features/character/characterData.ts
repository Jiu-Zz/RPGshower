import type { z } from "zod";
import { characterSchema } from "./characterSchema.ts";
import type { Character } from "./characterTypes.ts";

export type CharacterParseResult =
  | { success: true; data: Character }
  | { success: false; kind: "syntax" | "schema"; messages: string[] };

function formatIssuePath(path: z.core.$ZodIssue["path"]) {
  if (path.length === 0) {
    return "角色数据";
  }

  return path.reduce<string>((result, segment) => {
    if (typeof segment === "number") {
      return `${result}[${segment}]`;
    }

    return result ? `${result}.${String(segment)}` : String(segment);
  }, "");
}

export function parseCharacterJson(jsonText: string): CharacterParseResult {
  let parsedData: unknown;

  try {
    parsedData = JSON.parse(jsonText);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "无法解析 JSON";
    return {
      success: false,
      kind: "syntax",
      messages: [`JSON 语法错误：${detail}`],
    };
  }

  const validationResult = characterSchema.safeParse(parsedData);

  if (!validationResult.success) {
    return {
      success: false,
      kind: "schema",
      messages: validationResult.error.issues.map(
        (issue) => `${formatIssuePath(issue.path)}：${issue.message}`,
      ),
    };
  }

  return { success: true, data: validationResult.data };
}

export function serializeCharacter(character: Character) {
  return JSON.stringify(character, null, 2);
}

export function downloadCharacterJson(character: Character) {
  const jsonBlob = new Blob([serializeCharacter(character)], {
    type: "application/json",
  });
  const downloadUrl = URL.createObjectURL(jsonBlob);
  const downloadLink = document.createElement("a");

  downloadLink.href = downloadUrl;
  downloadLink.download = `${character.id}.json`;
  document.body.append(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  URL.revokeObjectURL(downloadUrl);
}
