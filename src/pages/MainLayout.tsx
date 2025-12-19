import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MenuMobile } from '../components/MenuMobile';

type MainLayoutProps = {
  onLogout: () => void;
};

export const MainLayout = ({ onLogout }: MainLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  const hideBottomNav = isMenuOpen || isLandscape;

  useEffect(() => {
    const checkOrientation = () => {
      const isLandscapeMode = window.innerWidth > window.innerHeight;
      setIsLandscape(isLandscapeMode);
    };

    checkOrientation();

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-screen safe-area-top safe-area-bottom overflow-hidden">
      <div
        className="flex-1 w-full overflow-y-auto"
        style={{ paddingBottom: '80px' }}
      >
        <Header onMenuToggle={() => setIsMenuOpen(true)} />

        <main className="w-full px-4">
          <Outlet />
        </main>
      </div>

      <BottomNav isHidden={hideBottomNav} />

      <MenuMobile
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onLogout={onLogout}
      />
    </div>
  );
};
