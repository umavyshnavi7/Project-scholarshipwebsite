import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  scholarships: [],
  applications: [],
  loading: false,
  error: null
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'SET_SCHOLARSHIPS':
      return { ...state, scholarships: action.payload };
    case 'ADD_SCHOLARSHIP':
      return { ...state, scholarships: [...state.scholarships, action.payload] };
    case 'UPDATE_SCHOLARSHIP':
      return {
        ...state,
        scholarships: state.scholarships.map(s =>
          s.id === action.payload.id ? action.payload : s
        )
      };
    case 'DELETE_SCHOLARSHIP':
      return {
        ...state,
        scholarships: state.scholarships.filter(s => s.id !== action.payload)
      };
    case 'SET_APPLICATIONS':
      return { ...state, applications: action.payload };
    case 'UPDATE_APPLICATION':
      return {
        ...state,
        applications: state.applications.map(app =>
          app.id === action.payload.id ? action.payload : app
        )
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(storedUser) });
    }
    
    loadScholarships();
    loadApplications();
  }, []);

  const loadScholarships = () => {
    const scholarships = [
      {
        id: 1,
        title: "Merit-Based Excellence Scholarship",
        description: "Awarded to students demonstrating outstanding academic achievement and leadership potential.",
        amount: 5000,
        deadline: "2025-12-31",
        category: "Academic",
        status: "open"
      },
      {
        id: 2,
        title: "STEM Innovation Grant",
        description: "Supporting students pursuing degrees in Science, Technology, Engineering, and Mathematics.",
        amount: 3000,
        deadline: "2025-11-30",
        category: "STEM",
        status: "open"
      }
    ];
    dispatch({ type: 'SET_SCHOLARSHIPS', payload: scholarships });
  };

  const loadApplications = () => {
    const applications = [
      {
        id: 1,
        studentName: "John Smith",
        email: "john.smith@university.edu",
        scholarship: "Merit-Based Excellence Scholarship",
        gpa: 3.9,
        amount: 5000,
        submittedDate: "2025-01-01",
        status: "pending"
      },
      {
        id: 2,
        studentName: "Sarah Johnson",
        email: "sarah.j@university.edu",
        scholarship: "STEM Innovation Grant",
        gpa: 3.8,
        amount: 3000,
        submittedDate: "2025-10-28",
        status: "under review"
      }
    ];
    dispatch({ type: 'SET_APPLICATIONS', payload: applications });
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};