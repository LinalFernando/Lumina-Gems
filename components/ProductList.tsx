import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface ProductListProps {
  onProductSelect: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onProductSelect }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-serif font-bold text-royal-blue mb-8 text-center">Our Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 xl:gap-x-8">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="group relative cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-lg p-2" onClick={() => onProductSelect(product)}>
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-none overflow-hidden group-hover:opacity-90 transition-opacity lg:h-80 lg:aspect-none shadow-md">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.category} • {product.origin}</p>
              </div>
              <p className="text-lg font-medium text-royal-blue">${product.price.toLocaleString()}</p>
            </div>
            <div className="mt-2">
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-600 mr-2">
                {product.carat}ct
              </span>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-600">
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