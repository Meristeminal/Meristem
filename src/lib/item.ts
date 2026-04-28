import { GridPosition } from "./grid";
import { ToJSON } from "./save";

export interface Item extends ToJSON {
  /**
   * The name of the item
   */
  name: string;

  /**
   * The `href` to the image
   */
  icon: URL;

  /**
   * The type of item
   * NOTE: This is used for (de)serialization reasons
   **/
  readonly type: ItemType;
}

export interface GridItem extends Item {
  /**
   * The size of the item on the grid
   */
  size: GridPosition;
}

export function parseItem<T extends Item>(json: Record<string, unknown>): T {
  let item: T;
  switch (json["type"] as ItemType) {
    case ItemType.Player: {
      // @ts-ignore: This should be T
      item = PlayerItem.fromJSON(json) as T;
      break;
    }
    case ItemType.Object: {
      // @ts-ignore: This should be T
      item = ObjectItem.fromJSON(json) as T;
      break;
    }
    case ItemType.Npc: {
      // @ts-ignore: This should be T
      item = NpcItem.fromJSON(json) as T;
      break;
    }
    case ItemType.Music: {
      // @ts-ignore: This should be T
      item = MusicItem.fromJSON(json) as T;
      break;
    }
  }

  return item;
}

export enum ItemType {
  Player,
  Npc,
  Object,
  Music,
}

export class PlayerItem implements Item {
  readonly type: ItemType = ItemType.Player;
  constructor(
    public name: string,
    public icon: URL,
    public size: GridPosition,
    // TODO: Implement health handing #16
    public health: number,
  ) {}

  toJSON(): object {
    return this;
  }

  static fromJSON(json: Record<string, unknown>): PlayerItem {
    return new PlayerItem(
      json["name"] as string,
      new URL(json["icon"] as string),
      json["size"] as GridPosition,
      json["health"] as number,
    );
  }
}

export class NpcItem implements Item {
  readonly type: ItemType = ItemType.Npc;
  constructor(
    public name: string,
    public icon: URL,
    public size: GridPosition,
    // TODO: Implement health handing #16
    public health: number,
  ) {}

  toJSON(): object {
    return this;
  }

  static fromJSON(json: Record<string, unknown>): NpcItem {
    return new NpcItem(
      json["name"] as string,
      new URL(json["icon"] as string),
      json["size"] as GridPosition,
      json["health"] as number,
    );
  }
}

/**
 * Represents an object
 */
export class ObjectItem implements Item {
  readonly type: ItemType = ItemType.Object;
  constructor(
    public name: string,
    public icon: URL,
    public size: GridPosition,
  ) {}

  static fromJSON(json: Record<string, unknown>): ObjectItem {
    return new ObjectItem(
      json["name"] as string,
      new URL(json["icon"] as string),
      json["size"] as GridPosition,
    );
  }

  toJSON(): object {
    return this;
  }
}

/**
 * Represents a music track
 */
export class MusicItem implements Item {
  readonly type: ItemType = ItemType.Music;
  constructor(
    public name: string,
    public icon: URL,
    private audioURL: URL,
  ) {}

  static fromJSON(json: Record<string, unknown>): MusicItem {
    return new MusicItem(
      json["name"] as string,
      new URL(json["icon"] as string),
      new URL(json["audioURL"] as string),
    );
  }

  getAudio(): HTMLAudioElement {
    return new Audio(this.audioURL.toString());
  }

  toJSON(): object {
    return this;
  }
}
