import type { ActionArgs} from "@remix-run/node";
import { json} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import { requireAuth } from "~/server/auth.server";
import { addUserNote } from "~/server/routes/notes/notes.server";


export const action = async ({request}: ActionArgs) => {
  const user = await requireAuth(request);
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData)

  const NoteSchema = z.object({
    title: z.string().min(2),
    body: z.string(),
  })

  const isValid = NoteSchema.safeParse(formValues);

  if(!isValid.success){
    const field = isValid.error.errors[0].path;
    const message = isValid.error.errors[0].message;
    return json({field, message});
  }else{
    const writeNote = await addUserNote( user.uid, isValid.data );
    return redirect(`/notes/${writeNote.noteId}`)
  }

}



export default function AddNote() {
  const actionData = useActionData<typeof action>();

  
  

  return (
    <Form className="prose"  method="post">
      <h3>New Note Form</h3>
      {
        actionData 
        ? <p>{`${actionData.field}: ${actionData.message}`}</p>
        : <p></p>
      }
      <fieldset className="">
        <label className="block">title</label>
        <input className="block border-2 w-full max-w-lg rounded-md border-gray-300 shadow-sm " type={'text'} id="title" name="title"/>
      </fieldset>
      <fieldset className="mt-2">
        <label className="block">body</label>
        <textarea className="block border-2 w-full max-w-lg rounded-md border-gray-300 shadow-sm " id="body" name="body"/>
      </fieldset>
      <div className="py-3">

      <button className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Create Note</button>
      </div>
    </Form>
  )
  
}