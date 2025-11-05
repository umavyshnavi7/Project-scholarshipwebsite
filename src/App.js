import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './components/LandingPage';
import './App.css';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            user ? 
            <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace /> : 
            <Login />
          } 
        />
        <Route 
          path="/signup" 
          element={
            user ? 
            <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace /> : 
            <SignUp />
          } 
        />
        <Route 
          path="/student" 
          element={
            user && user.role === 'student' ? 
            <StudentDashboard /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/admin" 
          element={
            user && user.role === 'admin' ? 
            <AdminDashboard /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;