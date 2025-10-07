import StudentRow from './StudentRow.jsx'

export default function StudentTable({ students, onDelete, onEdit }) {
  return (
    <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
        <div className="col-span-2 ps-[50px]">Name</div>
        <div className="col-span-2">Email</div>
        <div className="col-span-2">Phone</div>
        <div className="col-span-2">Enroll Number</div>
        <div className="col-span-2">Date of admission</div>
        <div className="col-span-2"></div>
      </div>

      <div className="divide-y divide-gray-200">
        {students.map((student) => (
          <StudentRow
            key={student.id}
            student={student}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  )
}
