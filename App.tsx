import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Directory from './components/Directory';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import JoinUs from './components/JoinUs';
import AdminDashboard from './components/AdminDashboard';
import ServicesList from './components/ServicesList';
import Alliances from './components/Alliances';

import GraciasPage from './components/GraciasPage';

function HomePage() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <main className="selection:bg-yellow-400 selection:text-black">
      <Background />
      <Navbar />
      <div className="flex flex-col gap-0">
        <Hero />
        <About />
        <ServicesList />
        <Alliances />
        <JoinUs />

        <Directory />
        <Gallery />
      </div>
      <Footer onAdminClick={() => setIsAdminOpen(true)} />

      {isAdminOpen && (
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gracias" element={<GraciasPage />} />
    </Routes>
  );
}

export default App;
