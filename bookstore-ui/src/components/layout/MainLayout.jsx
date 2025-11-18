import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-white border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl">📚</span>
          <span className="text-xl font-bold text-fahasa-text">Bookstore</span>
        </Link>
        <nav className="space-x-4">
          <Link to="/login" className="text-sm text-fahasa-gray-600 hover:text-fahasa-red">Login</Link>
          <Link to="/register" className="text-sm text-white bg-fahasa-red px-3 py-1 rounded-md hover:bg-fahasa-yellow">Register</Link>
        </nav>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-white border-t mt-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-500">
      © {new Date().getFullYear()} Bookstore — built with Fahasa colors
    </div>
  </footer>
);

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-fahasa-gray-100">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
