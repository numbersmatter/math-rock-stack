import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import styles from "./styles/app.css"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});


export function links(){
  return [{ rel:"stylesheet", href:styles}]
}
export function Document({
  children,
  title = "Remix title",
}: {
  children: React.ReactNode;
  title?: string
}
) {
  return (
    <html className="h-full bg-gray-100" lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full" >
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      {/* <CardRootLayout > */}
        <Outlet />
      {/* </CardRootLayout> */}
    </Document>
  )
};

// Export a CatchBoundary and use the useCatch hook to handle thrown responses
// like the 404 we have in our loader.
// You can also catch thrown responses from actions as well.
export function CatchBoundary() {
  const caught = useCatch();

  switch (caught.status) {
    case 404: {
      return <h2>Resource not found!</h2>;
    }
    default: {
      // if we don't handle this then all bets are off. Just throw an error
      // and let the nearest ErrorBoundary handle this
      throw new Error(`${caught.status} not handled`);
    }
  }
}

// this will handle unexpected errors (like the default case above where the
// CatchBoundary gets a response it's not prepared to handle).
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document title="I flubbed up...">
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </Document>
  );
}



