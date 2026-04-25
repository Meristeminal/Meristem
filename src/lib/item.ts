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
}

export interface GridItem extends Item {
  /**
   * The size of the item on the grid
   */
  size: GridPosition;
}

export class PlayerItem implements Item {
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
}

export class NpcItem implements Item {
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
}

/**
 * Represents an object
 */
export class ObjectItem implements Item {
  constructor(
    public name: string,
    public icon: URL,
    public size: GridPosition,
  ) {}

  toJSON(): object {
    return this;
  }
}

/**
 * Represents a music track
 */
export class MusicItem implements Item {
  constructor(
    public name: string,
    public icon: URL,
    private audioURL: URL,
  ) {}

  getAudio(): HTMLAudioElement {
    return new Audio(this.audioURL.toString());
  }

  toJSON(): object {
    return this;
  }
}
