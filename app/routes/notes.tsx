import { Outlet } from "@remix-run/react";




export default function UserNotes(){


  return (
    <main className="px-5 py-4">
      <Outlet />
    </main>
  )
}