import React from 'react';
import { ViewState } from '../types';

interface HeroProps {
  setView: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <div className="relative bg-royal-blue overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-40"
          src="https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1920&auto=format&fit=crop"
          alt="Luxury Gems Background"
        />
        <div className="absolute inset-0 bg-royal-blue mix-blend-multiply" aria-hidden="true"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Unearth the Extraordinary
        </h1>
        <p className="mt-6 text-xl text-gold-light max-w-3xl">
          Discover a curated collection of the world's most exquisite gemstones. 
          Each piece tells a story of geological wonder, ethically sourced and 
          perfectly cut for the discerning collector.
        </p>
        <div className="mt-10">
          <button
            onClick={() => setView('CATALOG')}
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-none text-royal-blue bg-gold-accent hover:bg-white transition-colors duration-300"
          >
            View Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;