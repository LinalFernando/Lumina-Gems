import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface ProductListProps {
  onProductSelect: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onProductSelect }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-4xl font-serif font-bold text-royal-blue mb-12 text-center tracking-wide">Our Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 xl:gap-x-10">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="group relative cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl rounded-xl bg-white p-4 border border-gray-100" onClick={() => onProductSelect(product)}>
            <div className="w-full min-h-80 bg-gray-50 aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group-hover:opacity-100 transition-opacity lg:h-80 lg:aspect-none shadow-sm">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="mt-6 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-serif font-semibold text-royal-blue">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 font-light uppercase tracking-wider">{product.category} • {product.origin}</p>
              </div>
              <p className="text-xl font-medium text-gold-accent">${product.price.toLocaleString()}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="inline-block bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                {product.carat}ct
              </span>
              <span className="inline-block bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                {product.cut} Cut
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;