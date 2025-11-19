import React, { useState } from 'react';
import { Product, CartItem, ViewState } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setView('CART');
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setView('PRODUCT_DETAIL');
  };

  const handleCheckoutSuccess = () => {
    setCart([]);
    setView('HOME');
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 150;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} setView={setView} />
      
      <main className="flex-grow">
        {view === 'HOME' && (
          <>
            <Hero setView={setView} />
            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center mb-8">
                    <h3 className="text-gold-accent text-sm font-bold tracking-widest uppercase mb-2">Featured Selection</h3>
                </div>
                <ProductList onProductSelect={handleProductSelect} />
            </div>
          </>
        )}
        
        {view === 'CATALOG' && (
          <ProductList onProductSelect={handleProductSelect} />
        )}
        
        {view === 'PRODUCT_DETAIL' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setView('CATALOG')} 
            onAddToCart={addToCart} 
          />
        )}

        {view === 'CART' && (
          <Cart 
            cartItems={cart} 
            onUpdateQuantity={updateCartQuantity} 
            onRemove={removeFromCart}
            setView={setView}
          />
        )}

        {view === 'CHECKOUT' && (
          <Checkout 
            total={cartTotal} 
            onSuccess={handleCheckoutSuccess}
            onCancel={() => setView('CART')}
          />
        )}
      </main>

      <footer className="bg-royal-blue text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-serif text-xl mb-4">Lumina Gems</h4>
            <p className="text-gray-400 text-sm">Ethically sourced, expertly cut, eternally beautiful.</p>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4">Customer Care</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>Shipping & Returns</li>
              <li>Gemological Certificates</li>
              <li>Warranty</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
             <h4 className="font-serif text-lg mb-4">Contact</h4>
             <p className="text-gray-400 text-sm">concierge@luminagems.com</p>
             <p className="text-gray-400 text-sm">+1 (800) 555-0199</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Lumina Gems. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;