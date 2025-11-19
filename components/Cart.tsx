import React from 'react';
import { Trash2, ArrowRight } from 'lucide-react';
import { CartItem, ViewState } from '../types';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  setView: (view: ViewState) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onUpdateQuantity, onRemove, setView }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 150; // Flat rate insured shipping
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-serif font-bold text-royal-blue">Your Shopping Bag is Empty</h2>
        <p className="mt-4 text-gray-500">Discover our collection of rare gemstones.</p>
        <button 
          onClick={() => setView('CATALOG')}
          className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-none text-white bg-royal-blue hover:bg-slate-800"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-royal-blue mb-10">Shopping Bag</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-7">
          <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-none overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-center object-cover"
                  />
                </div>

                <div className="ml-4 flex-1 flex flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p className="ml-4">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="flex-1 flex items-end justify-between text-sm">
                    <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-gray-900 font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                        >
                          +
                        </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="font-medium text-red-500 hover:text-red-700 flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="mt-16 lg:mt-0 lg:col-span-5">
           <div className="bg-gray-50 p-8 shadow-md">
             <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
             
             <div className="mt-6 space-y-4">
               <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                 <div className="text-sm text-gray-600">Subtotal</div>
                 <div className="text-sm font-medium text-gray-900">${subtotal.toLocaleString()}</div>
               </div>
               <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                 <div className="text-sm text-gray-600">Secure Shipping (Insured)</div>
                 <div className="text-sm font-medium text-gray-900">${shipping}</div>
               </div>
               <div className="flex items-center justify-between pt-4">
                 <div className="text-base font-bold text-gray-900">Total</div>
                 <div className="text-base font-bold text-royal-blue">${total.toLocaleString()}</div>
               </div>
             </div>

             <button
              onClick={() => setView('CHECKOUT')}
              className="w-full mt-6 bg-royal-blue border border-transparent py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-blue"
             >
               Proceed to Checkout
             </button>
             <div className="mt-4 text-xs text-gray-500 text-center">
                Secure Checkout powered by Lumina Pay
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;