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
import { type Course } from "../types";

const courseCollection = collection(db, "courses");

export const courseService = {
  // Create a new course
  async createCourse(
    courseData: Omit<Course, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    const timestamp = new Date();
    const docRef = await addDoc(courseCollection, {
      ...courseData,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    return docRef.id;
  },

  // Get all courses
  async getAllCourses() {
    const querySnapshot = await getDocs(courseCollection);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  // READ - Get single course
  async getCourseById(courseId: string) {
    const docRef = doc(db, "courses", courseId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    throw new Error("Course not found");
  },
  // UPDATE - Update a course
  async updateCourse(
    courseId: string,
    updatedData: Partial<Omit<Course, "id" | "createdAt" | "updatedAt">>
  ) {
    const docRef = doc(db, "courses", courseId);
    await updateDoc(docRef, {
      ...updatedData,
      updatedAt: new Date(),
    });
  },

  // DELETE - Delete a course
  async deleteCourse(courseId: string) {
    const docRef = doc(db, "courses", courseId);
    await deleteDoc(docRef);
  },
};
