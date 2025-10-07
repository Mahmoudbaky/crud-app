import { useMemo, useState, useEffect } from 'react'
import Header from '../components/Header.jsx'
import StudentTable from '../components/StudentTable.jsx'
import StudentCard from '../components/StudentCard.jsx'
import StudentModal from '../components/StudentModal.jsx'

const defaultStudents = [
  {
    id: 1,
    name: 'Karthi',
    email: 'karthi@gammail.com',
    phone: '7305477760',
    enrollNumber: '123456735647760',
    dateOfAdmission: '08-Dec-2021',
    avatar: '/img/avatar.jpg'
  },
  {
    id: 2,
    name: 'Karthi',
    email: 'karthi@gammail.com',
    phone: '7305477760',
    enrollNumber: '123456735647760',
    dateOfAdmission: '08-Dec-2021',
    avatar: '/img/avatar.jpg'
  },
  {
    id: 3,
    name: 'Karthi',
    email: 'karthi@gammail.com',
    phone: '7305477760',
    enrollNumber: '123456735647760',
    dateOfAdmission: '08-Dec-2021',
    avatar: '/img/avatar.jpg'
  },
  {
    id: 4,
    name: 'Karthi',
    email: 'karthi@gammail.com',
    phone: '7305477760',
    enrollNumber: '123456735647760',
    dateOfAdmission: '08-Dec-2021',
    avatar: '/img/avatar.jpg'
  },
  {
    id: 5,
    name: 'Karthi',
    email: 'karthi@gammail.com',
    phone: '7305477760',
    enrollNumber: '123456735647760',
    dateOfAdmission: '08-Dec-2021',
    avatar: '/img/avatar.jpg'
  },
  {
    id: 6,
    name: 'Karthi',
    email: 'karthi@gammail.com',
    phone: '7305477760',
    enrollNumber: '123456735647760',
    dateOfAdmission: '08-Dec-2021',
    avatar: '/img/avatar.jpg'
  }
]

export default function Students() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students')
    return savedStudents ? JSON.parse(savedStudents) : defaultStudents
  })
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return students
    return students.filter((s) => 
      `${s.name} ${s.email} ${s.phone} ${s.enrollNumber}`.toLowerCase().includes(q)
    )
  }, [students, query])

  function handleAddClick() {
    setEditing(null)
    setModalOpen(true)
  }

  function handleSubmit(data) {
    if (data.id) {
      setStudents((prev) => prev.map((s) => (s.id === data.id ? { ...s, ...data } : s)))
    } else {
      setStudents((prev) => [{ id: Date.now(), ...data }, ...prev])
    }
    setModalOpen(false)
  }

  function handleEdit(student) {
    setEditing(student)
    setModalOpen(true)
  }

  function handleDelete(id) {
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header 
          query={query} 
          setQuery={setQuery} 
          onAdd={handleAddClick} 
        />

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

        <StudentModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          onSubmit={handleSubmit} 
          initial={editing} 
        />
      </div>
    </div>
  )
}


