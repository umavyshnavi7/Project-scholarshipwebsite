import { useApp } from '../contexts/AppContext';

export const useAuth = () => {
  const { state, dispatch } = useApp();

  const login = (userData) => {
    dispatch({ type: 'SET_USER', payload: userData });
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.email === userData.email);
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    const newUser = {
      ...userData,
      id: Date.now()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const loginData = {
      email: newUser.email,
      role: newUser.role,
      name: newUser.name
    };
    
    login(loginData);
    return loginData;
  };

  const authenticate = (email, password, role) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => 
      u.email === email && 
      u.password === password && 
      u.role === role
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const userData = {
      email: user.email,
      role: user.role,
      name: user.name
    };
    
    login(userData);
    return userData;
  };

  return {
    user: state.user,
    login,
    logout,
    register,
    authenticate
  };
};