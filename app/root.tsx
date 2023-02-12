import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
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

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Uh-oh!">
      <div className="error-container">
        <h1>App Error {error.name}</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
