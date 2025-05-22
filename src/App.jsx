import React from 'react';
import { Route, Routes } from 'react-router-dom';  // ← This was missing
import HomePage from './pages/home/home';          // ← This was missing
import AnimeDetail from './pages/anime/AnimeDetail';
import Navbar from './layouts/navbar';
import Footer from './layouts/footer';
import ErrorPage from './pages/error/error';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 to-purple-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;