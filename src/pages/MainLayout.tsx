import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { MenuMobile } from "../components/MenuMobile";

export const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  const hideBottomNav = isMenuOpen || isLandscape;

  useEffect(() => {
    const checkOrientation = () => {
      const isLandscapeMode = window.innerWidth > window.innerHeight;
      setIsLandscape(isLandscapeMode);
    };

    checkOrientation();

    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-full min-h-dvh">
      <Header onMenuToggle={() => setIsMenuOpen(true)} />

      <main className="flex-1 w-full h-full">
        <Outlet />
      </main>

      <BottomNav isHidden={hideBottomNav} />

      <MenuMobile isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};
