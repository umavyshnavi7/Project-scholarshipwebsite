// src/context/AuthContext.js (Updated)
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  // Initial admin user
  const initialAdmin = {
    id: 999,
    email: 'admin@scholartrack.com',
    password: 'admin123',
    name: 'System Admin',
    role: 'admin',
    createdAt: new Date().toISOString()
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('scholartrack_user');
    const savedUsers = localStorage.getItem('scholartrack_all_users');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedUsers) {
      setAllUsers(JSON.parse(savedUsers));
    } else {
      // Initialize with default admin
      setAllUsers([initialAdmin]);
      localStorage.setItem('scholartrack_all_users', JSON.stringify([initialAdmin]));
    }
    
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = allUsers.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const userData = {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
            role: foundUser.role
          };
          setUser(userData);
          localStorage.setItem('scholartrack_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const signup = (email, password, confirmPassword, userData = {}) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && password === confirmPassword) {
          // Check if email already exists
          const existingUser = allUsers.find(u => u.email === email);
          if (existingUser) {
            reject(new Error('Email already exists'));
            return;
          }

          const newUser = {
            id: Date.now(),
            email: email,
            password: password,
            name: userData.name || email.split('@')[0],
            role: userData.role || 'student',
            createdAt: new Date().toISOString(),
            ...userData
          };

          const updatedUsers = [...allUsers, newUser];
          setAllUsers(updatedUsers);
          localStorage.setItem('scholartrack_all_users', JSON.stringify(updatedUsers));

          // If it's a student signing up, log them in
          if (userData.role === 'student' || !userData.role) {
            const loginUser = {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
              role: newUser.role
            };
            setUser(loginUser);
            localStorage.setItem('scholartrack_user', JSON.stringify(loginUser));
          }

          resolve(newUser);
        } else {
          reject(new Error('Please fill all fields correctly'));
        }
      }, 1000);
    });
  };

  const createAdmin = (adminData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { email, password, name } = adminData;
        
        if (!email || !password || !name) {
          reject(new Error('All fields are required'));
          return;
        }

        // Check if email already exists
        const existingUser = allUsers.find(u => u.email === email);
        if (existingUser) {
          reject(new Error('Email already exists'));
          return;
        }

        const newAdmin = {
          id: Date.now(),
          email,
          password,
          name,
          role: 'admin',
          createdAt: new Date().toISOString(),
          createdBy: user.id
        };

        const updatedUsers = [...allUsers, newAdmin];
        setAllUsers(updatedUsers);
        localStorage.setItem('scholartrack_all_users', JSON.stringify(updatedUsers));

        resolve(newAdmin);
      }, 1000);
    });
  };

  const updateUserRole = (userId, newRole) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const updatedUsers = allUsers.map(u => 
          u.id === userId ? { ...u, role: newRole } : u
        );
        
        setAllUsers(updatedUsers);
        localStorage.setItem('scholartrack_all_users', JSON.stringify(updatedUsers));
        
        resolve(updatedUsers.find(u => u.id === userId));
      }, 1000);
    });
  };

  const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Prevent deleting yourself
        if (userId === user.id) {
          reject(new Error('Cannot delete your own account'));
          return;
        }

        const updatedUsers = allUsers.filter(u => u.id !== userId);
        setAllUsers(updatedUsers);
        localStorage.setItem('scholartrack_all_users', JSON.stringify(updatedUsers));
        
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('scholartrack_user');
  };

  const getAllUsers = () => {
    return allUsers.filter(u => u.id !== user.id); // Exclude current user
  };

  const value = {
    user,
    login,
    signup,
    logout,
    createAdmin,
    updateUserRole,
    deleteUser,
    getAllUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}