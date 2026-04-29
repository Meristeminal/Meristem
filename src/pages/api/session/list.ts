import { sanitizePath } from "@/lib/server/sanitization";
import { listSession } from "@/lib/server/storage";
import type { NextApiRequest, NextApiResponse } from "next";
import { SessionInfo } from "@/lib/state/session";

type ResponseData = SessionInfo[];

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (typeof req.query["user_id"] !== "string") {
    res.statusCode = 400;
    res.statusMessage = "Missing `user_id` query parameter";
    res.end();
    return;
  }

  const userId = sanitizePath(req.query["user_id"] as string);

  res.statusCode = 200;
  switch (req.method) {
    case "GET": {
      const data = listSession(userId);

      res.setHeader("Content-Type", "application/json");

      res.send(data);
      res.end();
      break;
    }
  }
}
