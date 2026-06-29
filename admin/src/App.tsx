import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './styles/theme';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Team from './pages/Team';
import TeamForm from './pages/TeamForm';
import Blog from './pages/Blog';
import Testimonials from './pages/Testimonials';
import Contacts from './pages/Contacts';
import Settings from './pages/Settings';
import Programs from './pages/Programs';

interface ProtectedRouteProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, darkMode, toggleDarkMode }) => {
  const token = localStorage.getItem('admin_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      {children}
    </DashboardLayout>
  );
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newVal = !prev;
      localStorage.setItem('theme', newVal ? 'dark' : 'light');
      return newVal;
    });
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <Projects />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/services" 
            element={
              <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <Services />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/team" 
            element={
              <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <Team />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/team/new" 
            element={
              <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <TeamForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/team/edit/:id" 
            element={
              <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <TeamForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/programs" 
            element={
              <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <Programs />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/blog" 
            element={
              <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <Blog />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/testimonials" 
            element={
              <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <Testimonials />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contacts" 
            element={
              <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <Contacts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <Settings />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="*" 
            element={
              <Navigate to={localStorage.getItem('admin_token') ? "/dashboard" : "/login"} replace />
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
