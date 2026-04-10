import React from 'react';
import { Package } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-primary text-secondary p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Package size={28} className="text-secondary" />
          <span className="text-xl font-bold tracking-wide">PackGenie</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-accent transition-colors">Home</a>
          <a href="#" className="hover:text-accent transition-colors">Features</a>
          <a href="#" className="hover:text-accent transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
