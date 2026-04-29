import {
  loadRawSessionData,
  loadSessionData,
  saveSessionData,
} from "@/lib/server/storage";
import type { NextApiRequest, NextApiResponse } from "next";
import { existsSync, mkdirSync, writeFile, writeFileSync } from "node:fs";
import mime from "mime";
import { JSONValue } from "next/dist/server/config-shared";
import { sanitizePath } from "@/lib/server/sanitization";
import { defaultSession } from "@/lib/state/session";

type ResponseData = JSONValue;

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

  const sessionId = sanitizePath(req.query["session_id"] as string);
  const userId = sanitizePath(req.query["user_id"] as string);

  res.statusCode = 200;
  switch (req.method) {
    case "GET": {
      let data = undefined;

      try {
        data = loadRawSessionData(userId, sessionId);
      } catch (e) {
        if (!data) {
          data = JSON.stringify(defaultSession(sessionId));
        }

        // res.statusCode = 500;
        // res.statusMessage = `${e}`;
        // res.end();
      }

      res.setHeader("Content-Type", "application/json");
      res.end(data);
      res.end();
      break;
    }
    case "POST": {
      try {
        saveSessionData(userId, req.body);
      } catch (e) {
        res.statusCode = 500;
        res.statusMessage = `${e}`;
      }

      res.end();
      break;
    }
  }
}
