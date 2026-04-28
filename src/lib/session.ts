import { DiceGroup, DiceGroupResult } from "./dice";
import {
  Item,
  ItemType,
  MusicItem,
  NpcItem,
  ObjectItem,
  PlayerItem,
} from "./item";

/** Represents the state of the die **/
export class DiceState {
  static get GROUP_DEFAULT(): DiceGroup[] {
    return [];
  }

  static get RESULTS_DEFAULT(): DiceGroupResult[] {
    return [];
  }

  static get DICE_WINDOW_IS_OPEN_DEFAULT(): boolean {
    return false;
  }

  constructor(
    public groups: DiceGroup[] = DiceState.GROUP_DEFAULT,
    public results: DiceGroupResult[] = DiceState.RESULTS_DEFAULT,
    public diceWindowIsOpen: boolean = DiceState.DICE_WINDOW_IS_OPEN_DEFAULT,
  ) {}

  static fromJSON(json: Record<string, unknown>): DiceState {
    return new DiceState(
      (json["groups"] as DiceGroup[]) ?? DiceState.GROUP_DEFAULT,
      (json["results"] as DiceGroupResult[]) ?? DiceState.RESULTS_DEFAULT,
      (json["diceWindowIsOpen"] as boolean) ??
        DiceState.DICE_WINDOW_IS_OPEN_DEFAULT,
    );
  }
}

/** Represents the state of the grid **/
export class GridState {
  static get GRID_SIZE_DEFAULT(): [number, number] {
    return [12, 10];
  }
  static get GRID_DEFAULT(): Item[][] {
    return [];
  }
  constructor(
    /** The number of rows and columns **/
    public gridSize: [number, number] = GridState.GRID_SIZE_DEFAULT,
    public grid: Item[][] = GridState.GRID_DEFAULT,
  ) {}

  static fromJSON(json: Record<string, unknown>): GridState {
    return new GridState(
      (json["gridSize"] as [number, number]) ?? GridState.GRID_SIZE_DEFAULT,
      (json["grid"] as Item[][]) ?? GridState.GRID_DEFAULT,
    );
  }
}

/** Represents the items that a session has loaded **/
export class SessionCatolog {
  // It would be nice if typescript allowed type parameters inside of getters
  static ITEM_DEFAULT<T extends Item>(): T[] {
    return [];
  }

  constructor(
    public npcs: NpcItem[] = SessionCatolog.ITEM_DEFAULT(),
    public players: PlayerItem[] = SessionCatolog.ITEM_DEFAULT(),
    public objects: ObjectItem[] = SessionCatolog.ITEM_DEFAULT(),
    public musicItems: MusicItem[] = SessionCatolog.ITEM_DEFAULT(),
  ) {}

  static fromJSON(json: Record<string, unknown>): SessionCatolog {
    const { npcs, players, objects, musicItems } = json as Record<
      string,
      undefined | Record<string, unknown>[]
    >;

    // This could be better, as the len check should be in its own if statement to reduce a new allocation, but this is cleaner visually
    return new SessionCatolog(
      npcs?.length
        ? npcs.map((npc) => NpcItem.fromJSON(npc))
        : SessionCatolog.ITEM_DEFAULT(),
      players?.length
        ? players.map((player) => PlayerItem.fromJSON(player))
        : SessionCatolog.ITEM_DEFAULT(),
      objects?.length
        ? objects.map((objects) => ObjectItem.fromJSON(objects))
        : SessionCatolog.ITEM_DEFAULT(),
      musicItems?.length
        ? musicItems.map((musicItem) => MusicItem.fromJSON(musicItem))
        : SessionCatolog.ITEM_DEFAULT(),
    );
  }
}

export type SessionId = Lowercase<string>;

/** Represents the state of a Meristem Session **/
export class Session {
  public id: SessionId;

  static get DEFAULT_TOOL_BAR_TAB(): ToolBarTab {
    return ToolBarTab.NPCs;
  }

  constructor(
    public name: string,
    public dice: DiceState = new DiceState(),
    public grid: GridState = new GridState(),
    public items: SessionCatolog = new SessionCatolog(),
    public toolbarTabSelected: ToolBarTab = Session.DEFAULT_TOOL_BAR_TAB,
  ) {
    this.id = name.replaceAll(" ", "_").toLowerCase() as SessionId;
  }

  static fromJSON(json: Record<string, unknown>): Session {
    return new Session(
      json["name"] as string,
      json["dice"]
        ? DiceState.fromJSON(json["dice"] as Record<string, unknown>)
        : new DiceState(),
      json["grid"]
        ? GridState.fromJSON(json["grid"] as Record<string, unknown>)
        : new GridState(),
      json["items"]
        ? SessionCatolog.fromJSON(json["items"] as Record<string, unknown>)
        : new SessionCatolog(),
      (json["toolbarTabSelected"] as ToolBarTab) ??
        Session.DEFAULT_TOOL_BAR_TAB,
    );
  }

  getInfo(): SessionInfo {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

export type SessionInfo = {
  id: SessionId;
  name: string;
};

export enum ToolBarTab {
  NPCs = "NPCS",
  Players = "Players",
  Objects = "Objects",
  Music = "Music",
  Images = "Images",
  More = "More",
}
