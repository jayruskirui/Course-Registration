import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './assets/pages/Login'
import Dashboard from './assets/pages/Dashboard'
import Courses from './assets/pages/Courses'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </>
  )
}

export default App
