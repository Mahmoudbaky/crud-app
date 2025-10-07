import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Students from './pages/Students.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}
