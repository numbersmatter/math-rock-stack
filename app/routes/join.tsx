import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { checkSessionCookie, signUp } from "~/server/auth.server";
import { commitSession, getSession } from "~/server/sessions";
import JoinScreen from "~/ui/login/JoinScreen";

export const loader = async ({ request }: LoaderArgs) => {
  // check if user session cookie exists
  // if it exists verify the cookie is still good
  const session = await getSession(request.headers.get("cookie"));
  const { uid } = await checkSessionCookie(session);

  // READ IN COOKIE MONSTER VOICE:
  // "If cookie good, user no need new cookie. Send user back to main page with good cookie!
  //  If cookie no good, user need complete form for yummy new cookie! Me like COOKIE AUTHENICATION!!!!"
  const headers = {
    "Set-Cookie": await commitSession(session),
  };
  if (uid) {
    return redirect("/", { headers });
  }
  return json(null, { headers });
};

export const action = async ({ request }: ActionArgs) => {
  //   get important fields from the form
  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const password = form.get("password");

  //   error if not all fields were returned or returned as non strings
  const formError = json({ error: "Please fill all fields!" }, { status: 400 });
  if (typeof name !== "string") return formError;
  if (typeof email !== "string") return formError;
  if (typeof password !== "string") return formError;

  //   try to sign-up user with that email address and password
  //   if attempt fails catch that error and return it to the client with status 401
  try {
    const sessionCookie = await signUp(name, email, password);
    const session = await getSession(request.headers.get("cookie"));
    session.set("session", sessionCookie);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    console.error(error);
    return json({ error: String(error) }, { status: 401 });
  }
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  return (
    <Form method="post">
      <JoinScreen />
    </Form>
  );
}
