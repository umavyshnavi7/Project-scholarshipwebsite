import { useApp } from '../contexts/AppContext';

export const useScholarships = () => {
  const { state, dispatch } = useApp();

  const addScholarship = (scholarshipData) => {
    const newScholarship = {
      ...scholarshipData,
      id: Date.now(),
      amount: parseInt(scholarshipData.amount),
      status: 'open'
    };
    
    dispatch({ type: 'ADD_SCHOLARSHIP', payload: newScholarship });
    return newScholarship;
  };

  const updateScholarship = (id, scholarshipData) => {
    const updatedScholarship = {
      ...scholarshipData,
      id,
      amount: parseInt(scholarshipData.amount)
    };
    
    dispatch({ type: 'UPDATE_SCHOLARSHIP', payload: updatedScholarship });
    return updatedScholarship;
  };

  const deleteScholarship = (id) => {
    dispatch({ type: 'DELETE_SCHOLARSHIP', payload: id });
  };

  const updateApplicationStatus = (appId, status) => {
    const application = state.applications.find(app => app.id === appId);
    if (application) {
      const updatedApp = { ...application, status };
      dispatch({ type: 'UPDATE_APPLICATION', payload: updatedApp });
    }
  };

  return {
    scholarships: state.scholarships,
    applications: state.applications,
    addScholarship,
    updateScholarship,
    deleteScholarship,
    updateApplicationStatus
  };
};