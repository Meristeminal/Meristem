import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { DiceGroup, DiceGroupResult } from "./dice";
import { Item, MusicItem, NpcItem, ObjectItem, PlayerItem } from "./item";

/** Represents the state of the die **/
export class DiceState {
  constructor(
    public groups: DiceGroup[] = [],
    public results: DiceGroupResult[] = [],
    public diceWindowIsOpen: boolean = false,
  ) {}
}

/** Represents the state of the grid **/
export class GridState {
  constructor(
    /** The number of rows and columns **/
    public gridSize: [number, number],
    public grid: Item[][],
  ) {}
}

/** Represents the items that a session has loaded **/
export class SessionCatolog {
  constructor(
    public npcs: NpcItem[] = [],
    public players: PlayerItem[] = [],
    public objects: ObjectItem[] = [],
    public musicItems: MusicItem[] = [],
  ) {}
}

/** Represents the state of a Meristem Session **/
export class Session {
  public id: string;

  constructor(
    public name: string,
    public dice: DiceState,
    public grid: GridState,
    public items: SessionCatolog,
    public toolbarTabSelected: ToolBarTab,
  ) {
    this.id = name.replaceAll(" ", "_").toLowerCase();
  }
}

export enum ToolBarTab {
  NPCs = "NPCS",
  Players = "Players",
  Objects = "Objects",
  Music = "Music",
  Images = "Images",
  More = "More",
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
