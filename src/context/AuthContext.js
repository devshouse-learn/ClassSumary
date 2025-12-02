import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar usuario del localStorage
    const storedUser = localStorage.getItem('classsummary_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = (email, password, name) => {
    const users = JSON.parse(localStorage.getItem('classsummary_users') || '[]');
    
    // Verificar si el email ya existe
    if (users.find(u => u.email === email)) {
      throw new Error('El email ya está registrado');
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password, // En producción, esto debería estar encriptado
      name,
      isGuest: false,
      createdAt: new Date().toISOString(),
      preferences: {
        language: 'es',
        autoSave: true,
        notifications: true
      }
    };

    users.push(newUser);
    localStorage.setItem('classsummary_users', JSON.stringify(users));
    
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    
    setUser(userWithoutPassword);
    localStorage.setItem('classsummary_user', JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('classsummary_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Email o contraseña incorrectos');
    }

    const userWithoutPassword = { ...foundUser };
    delete userWithoutPassword.password;
    
    setUser(userWithoutPassword);
    localStorage.setItem('classsummary_user', JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  };

  const loginAsGuest = () => {
    const guestUser = {
      id: `guest_${Date.now()}`,
      email: 'invitado@classsummary.com',
      name: 'Usuario Invitado',
      isGuest: true,
      createdAt: new Date().toISOString(),
      preferences: {
        language: 'es',
        autoSave: false,
        notifications: false
      }
    };

    setUser(guestUser);
    localStorage.setItem('classsummary_user', JSON.stringify(guestUser));
    
    return guestUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('classsummary_user');
  };

  const updateUserPreferences = (preferences) => {
    const updatedUser = {
      ...user,
      preferences: { ...user.preferences, ...preferences }
    };
    setUser(updatedUser);
    localStorage.setItem('classsummary_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    register,
    login,
    loginAsGuest,
    logout,
    updateUserPreferences,
    isAuthenticated: !!user,
    isGuest: user?.isGuest || false
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
