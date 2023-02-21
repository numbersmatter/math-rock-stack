import type { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { getFirestore } from "firebase-admin/firestore";

// helper function to convert firestore data to typescript
const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

// helper to apply converter to multiple collections
const dataPoint = <T extends FirebaseFirestore.DocumentData>(
  collectionPath: string
) => getFirestore().collection(collectionPath).withConverter(converter<T>());

type Todo = {
  id: string;
  title: string;
};

export type Note = {
  title: string;
  body: string;
}

export const db = {
  userTodos: (uid: string) => dataPoint<Todo>(`users/${uid}/todos`),
  userNotes: (uid: string) => dataPoint<Note>(`users/${uid}/notes`),
};
