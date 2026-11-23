import { AnimatePresence, MotionConfig } from 'motion/react';
import { Route, Routes, useLocation } from 'react-router';
import { Header } from '@/components/layout/Header';
import { HomePage } from '@/pages/HomePage';
import { CityPage } from '@/pages/CityPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export default function App() {
  const location = useLocation();
  return (
    // reducedMotion="user": if the OS asks for less motion, transforms are disabled automatically.
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen text-white">
        <Header />
        {/* mode="wait": the old page finishes its exit animation before the new one enters */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/city/:lat/:lon" element={<CityPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
        <footer className="pb-8 text-center text-xs text-white/60">
          Learning project by David Constantin · Weather data by <a className="underline" href="https://open-meteo.com/">Open-Meteo</a>
        </footer>
      </div>
    </MotionConfig>
  );
}
