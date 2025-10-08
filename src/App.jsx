import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Students from './pages/Students.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/students" element={<Students />} />
<<<<<<< HEAD
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
=======
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
>>>>>>> 7e7ca8ce27f123636ac5c6a1fcfb00c981888a08
      </Routes>
    </BrowserRouter>
  )
}
