"use server";
import { getSession, postSession } from "@/lib/client/api";
import SessionClient from "@/Components/SessionClient";
import { usePathname } from "next/navigation";
import { sanitizePath } from "@/lib/server/sanitization";
import { AppRoute } from "next/dist/build/swc/types";
import { use } from "react";
import { AppRoutes } from "../../../.next/dev/types/routes";

// The reason for the demo info is easy, instead of throwing an error
// it puts the user into a demo session.
// NOTE: This should be changed, but this works well for testing
const DEMO_USER = "demo_user";
const DEMO_SESSION = "demo_session";

export default async function SessionPage({
  params,
  searchParams,
}: {
  params: Promise<{
    session_id?: string;
    user_id?: string;
  }>;
  searchParams: Promise<string>;
}) {
  // const x = await searchParams;

  //const pathName = String(x).split("?")[0];
  const pathName = "http://localhost:3000";

  // TODO: Handle errors with an error page

  const userId = sanitizePath(params.user_id ?? DEMO_USER);

  const sessionId = sanitizePath(params.session_id ?? DEMO_SESSION);

  let session = await getSession(pathName, userId, sessionId);

  // gotta love dep injection
  return <SessionClient session={JSON.stringify(session)} userId={userId} />;
}
