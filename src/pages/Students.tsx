import { useMemo, useState, useEffect } from "react";
import Header from "../components/Header.tsx";
import StudentTable from "../components/StudentTable.tsx";
import StudentCard from "../components/StudentCard.tsx";
import StudentModal from "../components/StudentModal.tsx";
import { studentService } from "../services/studentService";
import { type Student } from "../types";
import { useAuth } from "../context/AuthContext.tsx";

interface ModalStudent {
  id?: string;
  name: string;
  email: string;
  phone: string;
  enrollNumber: string;
  dateOfAdmission: string;
  avatar: string;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Student | undefined>(undefined);

  const { currentUser } = useAuth();

  // Load students from Firebase on component mount
  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      setLoading(true);
      setError(null);
      const studentsData = await studentService.getAllStudents();
      setStudents(studentsData as Student[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load students");
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) =>
      `${s.name} ${s.email} ${s.phone} ${s.enrollNumber}`
        .toLowerCase()
        .includes(q)
    );
  }, [students, query]);

  function handleAddClick() {
    setEditing(undefined);
    setModalOpen(true);
  }

  async function handleSubmit(data: ModalStudent) {
    try {
      setError(null);
      if (data.id) {
        // Update existing student
        await studentService.updateStudent(data.id, data);
        setStudents((prev: Student[]) =>
          prev.map((s: Student) =>
            s.id === data.id ? ({ ...s, ...data } as Student) : s
          )
        );
      } else {
        // Create new student
        const refomattedData = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          enrollNumber: data.enrollNumber,
          dateOfAdmission: data.dateOfAdmission,
          avatar: data.avatar,
        };

        const newStudentId = await studentService.createStudent(refomattedData);
        const newStudent: Student = {
          ...refomattedData,
          id: newStudentId,
        };
        setStudents((prev: Student[]) => [newStudent, ...prev]);
      }
      setModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save student");
    }
  }

  function handleEdit(student: Student) {
    setEditing(student);
    setModalOpen(true);
  }

  async function handleDelete(id: string | number) {
    try {
      setError(null);
      const idString = typeof id === "string" ? id : id.toString();
      await studentService.deleteStudent(idString);
      setStudents((prev: Student[]) =>
        prev.filter((s: Student) => s.id !== idString)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete student");
    }
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold text-gray-600">
          Please login to access this page.
        </div>
        <div className="text-2xl font-bold text-gray-600">
          <a href="/login" className="text-yellow-500 underline ml-2">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header query={query} setQuery={setQuery} onAdd={handleAddClick} />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-lg text-gray-600">Loading students...</div>
          </div>
        ) : (
          <>
            <StudentTable
              students={filtered}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
            <div className="lg:hidden space-y-4">
              {filtered.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <StudentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initial={editing}
      />
    </div>
  );
}
