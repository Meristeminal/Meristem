import {
  existsSync,
  mkdirSync,
  readdir,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { defaultSession, Session, SessionInfo } from "../state/session";

export function saveSessionAsset(
  userId: string,
  sessionId: string,
  assetName: string,
  data: Buffer | string,
): void {
  // This is not great, as a database should be used, but this works for the demo
  // TODO: Make async
  const assetsPath = getSessionAssetsPath(getSessionPath(userId, sessionId));

  ensureDir(assetsPath);

  writeFileSync(getAssetPath(assetsPath, assetName), data);
}

export function loadSessionAsset(
  userId: string,
  sessionId: string,
  assetName: string,
): Buffer {
  return readFileSync(
    getAssetPath(
      getSessionAssetsPath(getSessionPath(userId, sessionId)),
      assetName,
    ),
  );
}

export function loadSessionData(userId: string, sessionId: string): Session {
  const json = loadRawSessionData(userId, sessionId);

  return Session.fromJSON(JSON.parse(json));
}

export function loadRawSessionData(userId: string, sessionId: string): string {
  let json = readFileSync(
    getSessionDataPath(getSessionPath(userId, sessionId)),
    {
      encoding: "utf8",
    },
  );

  if (!json.length) {
    json = JSON.stringify(defaultSession(sessionId));
  }

  return json;
}

export function saveSessionData(userId: string, session: Session): void {
  // This is not great, as a database should be used, but this works for the demo
  // TODO: Make async
  const sessionPath = getSessionPath(userId, session.id);

  ensureDir(sessionPath);

  writeFileSync(getSessionDataPath(sessionPath), JSON.stringify(session));
}

function ensureDir(path: string): void {
  if (existsSync(path)) {
    return;
  }
  mkdirSync(path, { recursive: true });
}

export function listSession(userId: string): SessionInfo[] {
  const list = readdirSync(getSessionsPath(userId));

  return list.map((id) => loadSessionData(userId, id).getInfo());
}

function getSessionAssetsPath(sessionPath: string): string {
  return `${sessionPath}/assets/`;
}

function getAssetPath(assetsPath: string, assetName: string): string {
  return `${assetsPath}/${assetName}`;
}

function getUserPath(userId: string): string {
  return `./users/${userId}`;
}

function getSessionsPath(userId: string): string {
  return `${getUserPath(userId)}/sessions`;
}

function getSessionPath(userId: string, sessionId: string): string {
  return `${getSessionsPath(userId)}/${sessionId}`;
}

function getSessionDataPath(sessionPath: string): string {
  return `${sessionPath}/session.json`;
}
