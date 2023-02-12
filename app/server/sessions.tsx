import { createCookieSessionStorage } from "@remix-run/node";
export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "_session",
      secrets: ["super-secret-salt"],
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
      path: "/",
      httpOnly: true,
    },
  });