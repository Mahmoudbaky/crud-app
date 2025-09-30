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

const paymentCollection = collection(db, "payments");

export const paymentService = {
  // Create a new payment
  async createPayment(paymentData: any) {
    const timestamp = new Date();
    const docRef = await addDoc(paymentCollection, {
      ...paymentData,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    return docRef.id;
  },
  // Get all payments
  async getAllPayments() {
    const querySnapshot = await getDocs(paymentCollection);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
  // READ - Get single payment
  async getPaymentById(paymentId: string) {
    const docRef = doc(db, "payments", paymentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    throw new Error("Payment not found");
  },
  // UPDATE - Update a payment
  async updatePayment(
    paymentId: string,
    updatedData: Partial<Omit<Course, "id" | "createdAt" | "updatedAt">>
  ) {
    const docRef = doc(db, "payments", paymentId);
    await updateDoc(docRef, {
      ...updatedData,
      updatedAt: new Date(),
    });
  },
  // DELETE - Delete a payment
  async deletePayment(paymentId: string) {
    const docRef = doc(db, "payments", paymentId);
    await deleteDoc(docRef);
  },
};
