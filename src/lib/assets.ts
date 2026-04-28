import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { DiceGroup, DiceGroupResult } from "./dice";
import { Item, MusicItem, NpcItem, ObjectItem, PlayerItem } from "./item";



export function loadAsset(
  userId: string,
  sessionId: string,
  assetName: string,
): Buffer {
  return readFileSync(
    getAssetPath(getAssetsPath(userId, sessionId), assetName),
  );
}

function getAssetsPath(userId: string, sessionId: string): string {
  return `./users/${userId}/${sessionId}/assets/`;
}

function getAssetPath(assetsPath: string, assetName: string): string {
  return `${assetsPath}/${assetName}`;
}

export function saveAsset(
  userId: string,
  sessionId: string,
  assetName: string,
  data: Buffer | string,
): void {
  // This is not great, as a database should be used, but this works for the demo
  // TODO: Make async
  const assetsPath = getAssetsPath(userId, sessionId);
  if (!existsSync(assetsPath)) {
    mkdirSync(assetsPath, { recursive: true });
  }

  writeFileSync(getAssetPath(assetsPath, assetName), data);
}