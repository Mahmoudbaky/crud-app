import { studentService } from "./services/studentService";
import { useState, useEffect } from "react";
import type { Student } from "./types";
import { Button } from "@/components/ui/button";

const App = () => {
  const [students, setStudents] = useState<Student[]>([]);
  console.log(students);

  useEffect(() => {
    const fetchStudents = async () => {
      const allStudents = await studentService.getAllStudents();
      setStudents(allStudents as Student[]);
    };
    fetchStudents();
  }, []);

  const handleUpdate = async (id: string) => {
    try {
      await studentService.updateStudent(id, { name: "Omar" });
      // Refresh the student list after update
      const allStudents = await studentService.getAllStudents();
      setStudents(allStudents as Student[]);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await studentService.deleteStudent(id);
      // Refresh the student list after deletion
      const allStudents = await studentService.getAllStudents();
      setStudents(allStudents as Student[]);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await studentService.createStudent({
        name: "New Student",
        email: "mail@lol.com",
        phone: "1234567890",
        enrollNumber: "1234567890",
        admissionDate: new Date(),
      });
      // Refresh the student list after creation
      const allStudents = await studentService.getAllStudents();
      setStudents(allStudents as Student[]);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <div>
      <h1>Student List</h1>
      <Button onClick={() => handleCreate()}>Create </Button>
      <Button onClick={() => handleUpdate(students[0].id)}>Update </Button>
      <Button onClick={() => handleDelete(students[0].id)}>Delete </Button>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
