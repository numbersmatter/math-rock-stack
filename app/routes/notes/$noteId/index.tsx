import type { LoaderArgs} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/server/auth.server";
import { getUserNoteById } from "~/server/routes/notes/notes.server";


export const loader = async ({request, params }: LoaderArgs) => {
  const user = await requireAuth(request);
  const noteId = params.noteId ?? "no-noteId"
  const note = await getUserNoteById(user.uid, noteId )

  if(!note){
    throw new Response("No Note by that Id found", {status: 404}) 
  }

  return json({note})
};



export default function NotePage() {
  const { note } = useLoaderData<typeof loader>();

  return (
    <article className="prose" >
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <ul>
        <li>
          <Link to='/notes'>Back</Link>
        </li>
        <li>
          <Link to='edit'>Edit</Link>
        </li>
      </ul>
    </article>
  )  
}