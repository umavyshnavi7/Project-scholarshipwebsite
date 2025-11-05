// src/context/ScholarshipContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const ScholarshipContext = createContext();

export function useScholarships() {
  return useContext(ScholarshipContext);
}

export function ScholarshipProvider({ children }) {
  const [scholarships, setScholarships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockScholarships = [
    {
      id: 1,
      title: "Precisential Honors Scholarship",
      organization: "University Excellence Program",
      description: "A prestigious scholarship for outstanding academic achievers demonstrating leadership potential and community involvement.",
      amount: "$10,000",
      deadline: "2024-03-15",
      eligibility: "3.5+ GPA, Full-time student, Leadership experience",
      requirements: ["Essay", "Transcript", "2 Letters of Recommendation"],
      category: "Academic",
      status: "active"
    },
    {
      id: 2,
      title: "Arts & Culture Scholarship",
      organization: "Creative Foundation",
      description: "Supporting students pursuing degrees in arts, music, theater, and cultural studies.",
      amount: "$5,000",
      deadline: "2024-04-20",
      eligibility: "Arts major, Portfolio submission, 3.0+ GPA",
      requirements: ["Portfolio", "Personal Statement", "Transcript"],
      category: "Arts",
      status: "active"
    },
    {
      id: 3,
      title: "Engineering Excellence Fund",
      organization: "Institute of Engineers",
      description: "For engineering students demonstrating innovation and technical excellence.",
      amount: "$7,500",
      deadline: "2024-05-10",
      eligibility: "Engineering major, 3.2+ GPA, Project portfolio",
      requirements: ["Project Portfolio", "Technical Essay", "Transcript"],
      category: "Engineering",
      status: "active"
    }
  ];

  useEffect(() => {
    const savedScholarships = localStorage.getItem('scholartrack_scholarships');
    const savedApplications = localStorage.getItem('scholartrack_applications');
    
    if (savedScholarships) {
      setScholarships(JSON.parse(savedScholarships));
    } else {
      setScholarships(mockScholarships);
      localStorage.setItem('scholartrack_scholarships', JSON.stringify(mockScholarships));
    }
    
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
    
    setLoading(false);
  }, []);

  const applyForScholarship = (scholarshipId, applicationData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const scholarship = scholarships.find(s => s.id === scholarshipId);
        if (!scholarship) {
          reject(new Error('Scholarship not found'));
          return;
        }

        const newApplication = {
          id: Date.now(),
          scholarshipId,
          scholarshipTitle: scholarship.title,
          organization: scholarship.organization,
          appliedDate: new Date().toISOString(),
          status: 'pending',
          progress: 65,
          ...applicationData
        };

        const updatedApplications = [...applications, newApplication];
        setApplications(updatedApplications);
        localStorage.setItem('scholartrack_applications', JSON.stringify(updatedApplications));
        
        resolve(newApplication);
      }, 1500);
    });
  };

  const getStudentApplications = (studentId) => {
    return applications.filter(app => app.studentId === studentId);
  };

  const searchScholarships = (query, filters = {}) => {
    let results = scholarships.filter(scholarship => 
      scholarship.status === 'active'
    );

    if (query) {
      results = results.filter(scholarship =>
        scholarship.title.toLowerCase().includes(query.toLowerCase()) ||
        scholarship.organization.toLowerCase().includes(query.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters.category) {
      results = results.filter(scholarship => 
        scholarship.category === filters.category
      );
    }

    return results;
  };

  const value = {
    scholarships,
    applications,
    loading,
    applyForScholarship,
    getStudentApplications,
    searchScholarships
  };

  return (
    <ScholarshipContext.Provider value={value}>
      {children}
    </ScholarshipContext.Provider>
  );
}