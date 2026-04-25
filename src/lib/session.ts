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
  constructor(
    public id: string,
    public dice: DiceState,
    public grid: GridState,
    public items: SessionCatolog,
    public toolbarTabSelected: ToolBarTab,
  ) {}
}

export enum ToolBarTab {
  NPCs = "NPCS",
  Players = "Players",
  Objects = "Objects",
  Music = "Music",
  Images = "Images",
  More = "More",
}
