import { db } from "~/server/db.server";

export const getAllUserNotes = async (uid:string) => {
  const userNotesRef = db.userNotes(uid);
  const userNotesSnap = await userNotesRef.get();
  const userNotesArray = userNotesSnap.docs;
  
  const userNotes = userNotesArray.map((note)=>({...note.data(), noteId: note.id}));
  
  return userNotes;
};

export const getUserNoteById = async (uid:string, noteId:string) => {
  const noteRef = db.userNotes(uid).doc(noteId);
  const noteSnap = await noteRef.get();
  const noteData = noteSnap.data();
  if(!noteData){
    return undefined;
  };

  const note = {...noteData, noteId: noteSnap.id};

  return note;
};

export const addUserNote =async (uid:string, note:{ title:string, body: string}) => {
  const newNoteRef = db.userNotes(uid).doc();
  const writeResult = await newNoteRef.create(note);
  
  return { noteId: newNoteRef.id, writeResult}
};

export const setUserNote =async (uid:string, noteId: string, note:{ title:string, body: string}) => {
  const noteRef = db.userNotes(uid).doc(noteId);
  const writeResult = await noteRef.set(note);
  
  return { noteId, writeResult}
}



export const removeNote = async (uid: string, noteId: string) => {
  return await db.userNotes(uid).doc(noteId).delete();
};