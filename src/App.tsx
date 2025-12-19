import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Exams } from './pages/Exams';
import { Login } from './pages/Login';
import { Tules } from './pages/Tules';
import { Theory } from './pages/Theory';
import { Account } from './pages/Account';
import { MainLayout } from './pages/MainLayout';

function App() {
  const isLogged = true;

  if (!isLogged) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
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
