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
