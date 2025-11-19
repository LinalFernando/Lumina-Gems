import React from 'react';
import { ShoppingBag, Search, Diamond, Menu } from 'lucide-react';
import { APP_NAME } from '../constants';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount: number;
  setView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, setView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-royal-blue/95 backdrop-blur-sm text-white shadow-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => setView('HOME')}
          >
            <Diamond className="h-8 w-8 text-gold-accent mr-2 group-hover:text-white transition-colors duration-300" />
            <span className="font-serif text-2xl tracking-widest font-bold">{APP_NAME}</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => setView('HOME')} className="hover:text-gold-accent px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Home</button>
              <button onClick={() => setView('CATALOG')} className="hover:text-gold-accent px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Collection</button>
              <button className="hover:text-gold-accent px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Bespoke</button>
              <button className="hover:text-gold-accent px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Journal</button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button className="p-1 hover:text-gold-accent transition-colors duration-300">
              <Search className="h-6 w-6" />
            </button>
            <button
              className="p-1 relative hover:text-gold-accent transition-colors duration-300"
              onClick={() => setView('CART')}
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-gold-accent text-royal-blue text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="-mr-2 flex md:hidden">
              <button className="inline-flex items-center justify-center p-2 rounded-md hover:text-gold-accent focus:outline-none transition-colors duration-300">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;