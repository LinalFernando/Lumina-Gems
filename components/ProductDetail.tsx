import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { Product } from '../types';
import GemologistChat from './GemologistChat';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="bg-white min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-royal-blue transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Collection
        </button>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-100 rounded-none overflow-hidden sm:aspect-w-4 sm:aspect-h-3 shadow-lg">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-4xl font-serif font-bold tracking-tight text-royal-blue">{product.name}</h1>
            
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900 font-light">${product.price.toLocaleString()}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-sm font-medium text-gray-900">Specifications</h3>
              <div className="mt-4 prose prose-sm text-gray-500">
                <ul className="grid grid-cols-2 gap-4 list-none pl-0">
                  <li className="border-b pb-2"><span className="font-semibold text-gray-900">Origin:</span> {product.origin}</li>
                  <li className="border-b pb-2"><span className="font-semibold text-gray-900">Carat Weight:</span> {product.carat}</li>
                  <li className="border-b pb-2"><span className="font-semibold text-gray-900">Cut:</span> {product.cut}</li>
                  <li className="border-b pb-2"><span className="font-semibold text-gray-900">Category:</span> {product.category}</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col space-y-4">
              <button
                onClick={() => onAddToCart(product)}
                className="w-full bg-royal-blue border border-transparent py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-blue transition-colors"
              >
                Add to Bag
              </button>
              
              <button
                onClick={() => setShowChat(!showChat)}
                className="w-full bg-gold-light border border-gold-accent py-3 px-8 flex items-center justify-center text-base font-medium text-royal-blue hover:bg-white transition-colors"
              >
                <Sparkles className="h-5 w-5 mr-2 text-royal-blue" />
                Ask AI Gemologist
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex space-x-8 text-sm text-gray-500 justify-center">
               <div className="flex items-center">
                 <ShieldCheck className="h-5 w-5 mr-2 text-gold-accent" />
                 <span>Certificate of Authenticity</span>
               </div>
               <div className="flex items-center">
                 <Truck className="h-5 w-5 mr-2 text-gold-accent" />
                 <span>Secure Insured Shipping</span>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Overlay */}
      {showChat && <GemologistChat product={product} onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default ProductDetail;