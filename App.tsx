import React, { useState } from 'react';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Directory from './components/Directory';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import JoinUs from './components/JoinUs';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <main className="selection:bg-yellow-400 selection:text-black">
      <Background />
      <Navbar />
      <div className="flex flex-col gap-0">
        <Hero />
        <About />
        <JoinUs />
        <Events />
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

export default App;