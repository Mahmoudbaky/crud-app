import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { type Student } from "../types";

export const studentService = {
  // Create a new student
  async createStudent(
    studentData: Omit<Student, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    const timestamp = new Date();
    const docRef = await addDoc(collection(db, "students"), {
      ...studentData,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    return docRef.id;
  },

  // Get all students
  async getAllStudents() {
    const querySnapshot = await getDocs(collection(db, "students"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  // READ - Get single student
  async getStudentById(studentId: string) {
    const docRef = doc(db, "students", studentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    throw new Error("User not found");
  },

  // READ - Query students by name
  async getStudentsName(searchTerm: string) {
    const q = query(
      collection(db, "students"),
      where("role", "==", searchTerm),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  // UPDATE - Update student
  async updateStudent(studentId: string, updates: Partial<Student>) {
    const docRef = doc(db, "students", studentId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
    return { id: studentId, ...updates };
  },

  // DELETE - Delete student
  async deleteStudent(studentId: string) {
    await deleteDoc(doc(db, "students", studentId));
    return studentId;
  },
};
