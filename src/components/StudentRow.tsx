import { type Student } from "../types";
import { Button } from "./ui/button";

interface StudentRowProps {
  student: Student;
  onDelete: (id: string) => void;
  onEdit: (student: Student) => void;
}

export default function StudentRow({
  student,
  onDelete,
  onEdit,
}: StudentRowProps) {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center">
      <div className="col-span-2 flex items-center gap-3">
        <img
          src={student.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-lg object-cover"
        />
        <span className="text-gray-800 font-medium">{student.name}</span>
      </div>
      <div className="col-span-2 text-gray-600 text-sm">{student.email}</div>
      <div className="col-span-2 text-gray-600 text-sm">{student.phone}</div>
      <div className="col-span-2 text-gray-600 text-sm">
        {student.enrollNumber}
      </div>
      <div className="col-span-2 text-gray-600 text-sm">
        {student.dateOfAdmission}
      </div>
      <div className="col-span-2 flex items-center justify-end gap-3">
        <Button
          className="fa-solid fa-pencil text-[#FEAF00] cursor-pointer"
          onClick={() => onEdit(student)}
        >
          edit
        </Button>
        <Button
          className="fa-solid fa-trash text-[#FEAF00] cursor-pointer"
          onClick={() => onDelete(student.id)}
        >
          delete
        </Button>
      </div>
    </div>
  );
}
