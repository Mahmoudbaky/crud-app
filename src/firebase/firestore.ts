// src/firebase/firestore.js
import { db } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Create
export const createDocument = async (collectionName: string, data: any) => {
  return await addDoc(collection(db, collectionName), data);
};

// Read
export const getDocuments = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update
export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: any
) => {
  const docRef = doc(db, collectionName, docId);
  return await updateDoc(docRef, data);
};

// Delete
export const deleteDocument = async (collectionName: string, docId: string) => {
  return await deleteDoc(doc(db, collectionName, docId));
};
