import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Exams } from "./components/Exams";
import { Login } from "./components/Login";
import { BottomNav } from "./components/BottomNav";
import { Tules } from "./components/Tules";
import { Theory } from "./components/Theory";
import { Account } from "./components/Account";
import { Menu } from "lucide-react";

function App() {
  const isLogged = true;

  if (!isLogged) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col w-full h-full min-h-dvh">
        <header className="flex items-center justify-between flex-none w-full p-2">
          <a>
            <img src="/imgs/logo.webp" width={72} alt="logo escuela" />
          </a>
          <Menu />
        </header>
        <main className="flex-1 w-full h-full">
          <Routes>
            <Route path="/" element={<Exams />} />
            <Route path="/tules" element={<Tules />} />
            <Route path="/theory" element={<Theory />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
