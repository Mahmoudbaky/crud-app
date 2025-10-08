import { useEffect, useState } from 'react'

export default function StudentModal({ open, onClose, onSubmit, initial }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [enrollNumber, setEnrollNumber] = useState('')
  const [dateOfAdmission, setDateOfAdmission] = useState('')
  const [avatar, setAvatar] = useState('/img/avatar.jpg')

  useEffect(() => {
    if (initial) {
      setName(initial.name || '')
      setEmail(initial.email || '')
      setPhone(initial.phone || '')
      setEnrollNumber(initial.enrollNumber || '')
      setDateOfAdmission(initial.dateOfAdmission || '')
      setAvatar(initial.avatar || '/img/avatar.jpg')
    } else {
      setName('')
      setEmail('')
      setPhone('')
      setEnrollNumber('')
      setDateOfAdmission('')
      setAvatar('/img/avatar.jpg')
    }
  }, [initial, open])

  if (!open) return null

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ 
      id: initial?.id, 
      name, 
      email, 
      phone, 
      enrollNumber, 
      dateOfAdmission, 
      avatar 
    })
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setAvatar(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4">{initial ? 'Edit Student' : 'Add Student'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Avatar</label>
            <div className="flex items-center gap-4">
              <img src={avatar} alt="avatar preview" className="w-16 h-16 rounded-lg object-cover border" />
              <input 
                type="file" 
                accept="image/*" 
                className="text-sm" 
                onChange={handleAvatarChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              <input 
                type="tel" 
                required 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Enroll Number</label>
              <input 
                type="text" 
                required 
                value={enrollNumber}
                onChange={(e) => setEnrollNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Date of admission</label>
              <input 
                type="date" 
                required 
                value={dateOfAdmission}
                onChange={(e) => setDateOfAdmission(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 rounded-lg bg-[#FEAF00] text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}



