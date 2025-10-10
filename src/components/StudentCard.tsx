import { type Student } from "../types";

interface StudentCardProps {
  student: Student;
  onDelete: (id: string) => void;
  onEdit: (student: Student) => void;
}

export default function StudentCard({
  student,
  onDelete,
  onEdit,
}: StudentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex gap-4">
        <img
          src={student.avatar}
          alt={student.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {student.name}
          </h3>
          <div className="space-y-1 text-sm">
            <p>
              <span className="text-gray-500">Email:</span> {student.email}
            </p>
            <p>
              <span className="text-gray-500">Phone:</span> {student.phone}
            </p>
            <p>
              <span className="text-gray-500">Enroll:</span>{" "}
              {student.enrollNumber}
            </p>
            <p>
              <span className="text-gray-500">Date:</span>{" "}
              {student.dateOfAdmission}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
        <button
          className="text-[#FEAF00] hover:text-yellow-600 flex items-center gap-2 px-4 py-2"
          onClick={() => onEdit(student)}
        >
          <i className="fa-solid fa-pencil text-[#FEAF00]"></i>
          <span className="text-sm font-medium">Edit</span>
        </button>
        <button
          className="text-[#FEAF00] hover:text-yellow-600 flex items-center gap-2 px-4 py-2"
          onClick={() => onDelete(student.id)}
        >
          <i className="fa-solid fa-trash text-[#FEAF00]"></i>
          <span className="text-sm font-medium">Delete</span>
        </button>
      </div>
    </div>
  );
}
