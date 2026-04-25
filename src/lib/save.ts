/**
 * Handles object serialization
 */
export interface ToJSON {
  /**
   * Converts this object to JSON.
   */
  toJSON(): object;
}
