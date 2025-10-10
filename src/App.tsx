import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Students from "./pages/Students.tsx";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/students" element={<Students />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
