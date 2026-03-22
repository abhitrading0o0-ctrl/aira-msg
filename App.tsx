import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import BackgroundAudio from './components/backgroundaudio';
import ContactPage from './components/contactpage';
import MainPage from './components/mainpage';
import MotivationPage from './components/motivationpage';
import Navigation from './components/navigation';
import { useSoundEffects } from './Hooks/useSoundEffects';

export default function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [hasStarted, setHasStarted] = useState(false);
  const { playClick } = useSoundEffects();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const handleGlobalClick = () => {
      if (hasStarted) {
        playClick();
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [hasStarted, playClick]);

  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainPage hasStarted={hasStarted} onStart={() => setHasStarted(true)} />;
      case 'motivation':
        return <MotivationPage key="motivation" />;
      case 'contact':
        return <ContactPage key="contact" />;
      default:
        return <MainPage hasStarted={hasStarted} onStart={() => setHasStarted(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-shiva-dark selection:bg-shiva-glow selection:text-white">
      <BackgroundAudio forcePlay={hasStarted} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      <Navigation currentPage={currentPage} setPage={setCurrentPage} />

      <div className="pointer-events-none fixed inset-0 z-[100] border-[24px] border-shiva-dark/10 opacity-50 mix-blend-overlay" />
    </div>
  );
}
