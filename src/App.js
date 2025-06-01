import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import './theme.css';
import AdminDashboard from "./pages/AdminDashboard";
import StudentManagement from "./pages/StudentManagement";
import LeaveApprovals from "./pages/LeaveApprovals";
import NotApproved from "./pages/NotApproved";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AttendancePage from "./pages/AttendancePage";
import LeavePage from "./pages/LeavePage";
import ProfilePage from "./pages/ProfilePage";
import StudentMessages from "./pages/StudentMessages";

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Navbar at the top */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/not-approved" element={<NotApproved />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/leave" element={<LeavePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin/messages" element={<StudentMessages />} />
        <Route path="/student-dashboard" element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }/>

        <Route path="/admin-dashboard" element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }/>
        <Route path="/admin/students" element={<StudentManagement />} />
        <Route path="/admin/leave-approvals" element={<LeaveApprovals />} />
      </Routes>
    </Router>
  );
}

export default App;
