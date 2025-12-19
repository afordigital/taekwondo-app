import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <header className="relative z-40 flex items-center justify-between flex-none w-full px-4 py-2 bg-white shadow-sm safe-area-top">
      <a href="/">
        <img src="/imgs/logo.webp" width={72} alt="logo escuela" />
      </a>

      <button
        onClick={onMenuToggle}
        className="p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100"
        aria-label="Abrir menú"
      >
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
};
