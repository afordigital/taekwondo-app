import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Exams } from './pages/Exams';
import { Login } from './pages/Login';
import { Tules } from './pages/Tules';
import { Theory } from './pages/Theory';
import { Account } from './pages/Account';
import { MainLayout } from './pages/MainLayout';
import { authClient } from '../lib/auth-client';

function App() {
  const [session, setSession] = useState<unknown>(() => {
    const stored = localStorage.getItem('authSession');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionData = await authClient.getSession();
        const currentSession = sessionData.data?.session || null;
        setSession(currentSession);

        if (currentSession) {
          localStorage.setItem('authSession', JSON.stringify(currentSession));
        } else {
          localStorage.removeItem('authSession');
        }
      } catch {
        setSession(null);
        localStorage.removeItem('authSession');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLoginSuccess = async () => {
    try {
      const sessionData = await authClient.getSession();
      const currentSession = sessionData.data?.session || null;
      setSession(currentSession);

      if (currentSession) {
        localStorage.setItem('authSession', JSON.stringify(currentSession));
      }
    } catch {
      setSession(null);
      localStorage.removeItem('authSession');
    }
  };

  const handleLogout = async () => {
    await authClient.signOut();
    setSession(null);
    localStorage.removeItem('authSession');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (!session) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout onLogout={handleLogout} />}>
          <Route path="/" element={<Exams />} />
          <Route path="/tules" element={<Tules />} />
          <Route path="/theory" element={<Theory />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
