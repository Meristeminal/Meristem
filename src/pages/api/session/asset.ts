import { sanitizePath } from "@/lib/sanitization";
import { loadAsset, saveAsset } from "@/lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import { existsSync, mkdirSync, writeFile, writeFileSync } from "node:fs";
import mime from "mime";
type ResponseData = {
  message: string;
};
export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req: NextApiRequest) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  // TODO: This could be simplified
  if (typeof req.query["asset"] !== "string") {
    res.statusCode = 400;
    res.statusMessage = "Missing `asset` query parameter";
    res.end();
    return;
  }

  if (typeof req.query["session_id"] !== "string") {
    res.statusCode = 400;
    res.statusMessage = "Missing `session_id` query parameter";
    res.end();
    return;
  }

  if (typeof req.query["user_id"] !== "string") {
    res.statusCode = 400;
    res.statusMessage = "Missing `user_id` query parameter";
    res.end();
    return;
  }

  const assetName = sanitizePath(req.query["asset"] as string);
  const sessionId = sanitizePath(req.query["session_id"] as string);
  const userId = sanitizePath(req.query["user_id"] as string);

  res.statusCode = 200;
  switch (req.method) {
    case "GET": {
      const data = loadAsset(userId, sessionId, assetName);

      res.setHeader(
        "Content-Type",
        mime.getType(assetName) || "application/octet-stream",
      );

      res.end(data);

      break;
    }
    case "POST": {
      // if (req.body === undefined) {
      //   res.statusCode = 400;
      //   res.statusMessage = "Missing request body";
      //   res.end();
      //   return;
      // }

      try {
        saveAsset(userId, sessionId, assetName, await getRawBody(req));
      } catch (e) {
        res.statusCode = 500;
        res.statusMessage = `${e}`;
      }

      res.end();
      break;
    }
  }
}
