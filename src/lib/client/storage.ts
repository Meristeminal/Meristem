import { BASE_URI } from "../constants";
import { PlayerItem } from "../state/item";
import {
  defaultSession,
  DiceState,
  GridState,
  Session,
  SessionCatolog,
  ToolBarTab,
} from "../state/session";
import { postSession } from "./api";

function createSessionKey(userId: string, sessionId: string): string {
  return `meristem:user_${userId}:session_${sessionId}`;
}

export function loadLocalSession(userId: string, sessionId: string): Session {
  const json = window.localStorage.getItem(createSessionKey(userId, sessionId));

  if (json !== null) {
    // TODO: Handle parse error here
    // ^ this should not occur
    return Session.fromJSON(JSON.parse(json));
  }

  // TODO: use `new Session(sessionId)` after testing
  const session = defaultSession(sessionId);

  window.localStorage.setItem(
    createSessionKey(userId, sessionId),
    JSON.stringify(session),
  );

  // Send the session to the server
  postSession(BASE_URI, userId, session);

  return session;
}

export function saveLocalSession(userId: string, session: Session): void {
  const json = JSON.stringify(session);
  window.localStorage.setItem(createSessionKey(userId, session.id), json);
  postSession(BASE_URI, userId, session);
}
