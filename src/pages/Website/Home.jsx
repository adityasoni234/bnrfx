import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Spreads from './Spreads';
import Features from './Features';
import Platforms from './Platforms';
import Markets from './Markets';
import AccountOpening from './AccountModal';
import CompanyStats from './CompanyStats';
import Footer from './Footer';
import AccountModal from './AccountModal';
import '../../styles/Website/Home.css';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="website">
      <Navbar onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <Spreads />
      <Features />
      <Platforms />
      <Markets />
      <AccountOpening onOpenModal={openModal} />
      <CompanyStats onOpenModal={openModal} />
      <Footer />
      
      <AccountModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Home;