export type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrollNumber: string;
  dateOfAdmission: string;
  avatar: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Course = {
  id: string;
  name: string;
  code: string;
  creditHours: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Payment = {
  studentId: string;
  amountPaid: number;
  paymentSchedule: string; // e.g., "Monthly", "Quarterly"
  balanceAmount: number;
  billNumber: string;
  createdAt: Date;
  updatedAt: Date;
};
