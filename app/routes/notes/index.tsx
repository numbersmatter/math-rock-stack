import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { requireAuth } from "~/server/auth.server"
import { getAllUserNotes } from "~/server/routes/notes/notes.server"


export async function loader({params, request} : LoaderArgs) {
  const user = await requireAuth(request)
  const notes = await getAllUserNotes(user.uid);

  return json({notes})
}



export default function UserNotes(){

  const {notes} = useLoaderData<typeof loader>()

  return (
    <div className="prose prose-xl" >
      <h1>User notes</h1>
      <p>List of user notes</p>
      <ul>
      {
        notes.map((note) =>
        <li key={note.noteId}>
            <Link to={note.noteId} >{note.title}</Link>
          </li>
        )
      }
      <li>
        <Link to="/notes/add-note">
          Add Note
        </Link>
      </li>
      </ul>
    </div>
  )
}