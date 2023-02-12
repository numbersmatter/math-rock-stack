import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { useCallback, useState } from "react";

import * as firebaseRest from "../server/firebase-rest";
import {
  checkSessionCookie,
  signIn,
  signInWithToken,
} from "~/server/auth.server";
import { commitSession, getSession } from "../server/sessions";
import { getRestConfig } from "~/server/firebase.server";
import LoginScreen from "~/ui/login/LoginScreen";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get("cookie"));
  const { uid } = await checkSessionCookie(session);
  const headers = {
    "Set-Cookie": await commitSession(session),
  };
  if (uid) {
    return redirect("/", { headers });
  }
  const { apiKey, domain } = getRestConfig();
  return json({ apiKey, domain }, { headers });
};

type ActionData = {
  error?: string;
};
export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const idToken = form.get("idToken");
  let sessionCookie;
  try {
    if (typeof idToken === "string") {
      sessionCookie = await signInWithToken(idToken);
    } else {
      const email = form.get("email");
      const password = form.get("password");
      const formError = json(
        { error: "Please fill all fields!" },
        { status: 400 }
      );
      if (typeof email !== "string") return formError;
      if (typeof password !== "string") return formError;
      sessionCookie = await signIn(email, password);
    }
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
  const [clientAction, setClientAction] = useState<ActionData>();
  const actionData = useActionData<typeof action>();
  const restConfig = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // To avoid rate limiting, we sign in client side if we can.
      const login = await firebaseRest.signInWithPassword(
        {
          email: event.currentTarget.email.value,
          password: event.currentTarget.password.value,
          returnSecureToken: true,
        },
        restConfig
      );
      if (firebaseRest.isError(login)) {
        setClientAction({ error: login.error.message });
        return;
      }
      submit({ idToken: login.idToken }, { method: "post" });
    },
    [submit, restConfig]
  );
  return (
    <form method="post" onSubmit={handleSubmit}>

      <LoginScreen clientAction={clientAction} actionData={actionData} />
    </form>
  );
}