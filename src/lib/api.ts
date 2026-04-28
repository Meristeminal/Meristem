import { Session, SessionInfo } from "./session";

export async function getAsset(
  baseUri: string,
  userId: string,
  sessionId: string,
  assetName: string,
): Promise<Blob> {
  let res = await fetch(
    `${baseUri}/api/session/asset?user_id=${userId}&session_id=${sessionId}&asset=${assetName}`,
    { method: "GET" },
  );

  return res.blob();
}

export async function postAsset(
  baseUri: string,
  userId: string,
  sessionId: string,
  assetName: string,
  asset: any,
): Promise<void> {
  await fetch(
    `${baseUri}/api/session/asset?user_id=${userId}&session_id=${sessionId}&asset=${assetName}`,
    { method: "POST", body: asset },
  );
}

export async function getSession(
  baseUri: string,
  userId: string,
  sessionId: string,
): Promise<Session> {
  const res = await fetch(
    `${baseUri}/api/session?user_id=${userId}&session_id=${sessionId}`,
    { method: "GET" },
  );

  const json = await res.json();

  return Session.fromJSON(json);
}

export async function postSession(
  baseUri: string,
  userId: string,
  session: Session,
): Promise<void> {
  await fetch(
    `${baseUri}/api/session?user_id=${userId}&session_id=${session.id}`,
    { method: "POST", body: JSON.stringify(session) },
  );
}

export async function listSessions(
  baseUri: string,
  userId: string,
): SessionInfo[] {
  return await fetch(
    `${baseUri}/api/session/asset?user_id=${userId}&session_id=${session.id}`,
    { method: "POST", body: JSON.stringify(session) },
  );
}
