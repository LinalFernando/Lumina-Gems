import React, { useState } from 'react';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import { ViewState } from '../types';

interface CheckoutProps {
  total: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ total, onSuccess, onCancel }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-900">Payment Successful</h2>
        <p className="mt-4 text-gray-500 text-lg">
          Thank you for your purchase. Your rare gemstones are being prepared for secure shipment.
          A confirmation email has been sent.
        </p>
        <button
          onClick={onSuccess}
          className="mt-8 inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-none text-white bg-royal-blue hover:bg-slate-800"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <h1 className="text-3xl font-serif font-bold text-royal-blue mb-10 text-center">Secure Checkout</h1>
       
       <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg border border-gray-100">
         {step === 'processing' ? (
           <div className="flex flex-col items-center justify-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-blue mb-4"></div>
             <p className="text-lg font-medium text-gray-700">Processing Payment...</p>
             <p className="text-sm text-gray-500 mt-2">Please do not close this window.</p>
           </div>
         ) : (
           <form onSubmit={handleSubmit}>
             {/* Contact Info */}
             <div className="mb-8">
               <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Contact Information</h3>
               <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                    <input required type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-none shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-blue focus:border-royal-blue sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input required type="tel" id="phone" className="mt-1 block w-full border border-gray-300 rounded-none shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-blue focus:border-royal-blue sm:text-sm" />
                  </div>
               </div>
             </div>

             {/* Shipping */}
             <div className="mb-8">
               <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Shipping Address</h3>
               <div className="grid grid-cols-1 gap-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input required type="text" className="mt-1 block w-full border border-gray-300 rounded-none shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-blue focus:border-royal-blue sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input required type="text" className="mt-1 block w-full border border-gray-300 rounded-none shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-blue focus:border-royal-blue sm:text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <input required type="text" className="mt-1 block w-full border border-gray-300 rounded-none shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-blue focus:border-royal-blue sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                      <input required type="text" className="mt-1 block w-full border border-gray-300 rounded-none shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-blue focus:border-royal-blue sm:text-sm" />
                    </div>
                  </div>
               </div>
             </div>

             {/* Payment */}
             <div className="mb-8">
               <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Payment Details</h3>
               <div className="bg-gray-50 p-4 rounded mb-4 flex items-center justify-between">
                 <span className="text-sm text-gray-600">Total to Pay</span>
                 <span className="text-lg font-bold text-royal-blue">${total.toLocaleString()}</span>
               </div>
               
               <div className="space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700">Card Number</label>
                   <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <input required type="text" placeholder="0000 0000 0000 0000" className="focus:ring-royal-blue focus:border-royal-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-none py-2" />
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expiration (MM/YY)</label>
                      <input required type="text" className="mt-1 block w-full border border-gray-300 rounded-none shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-blue focus:border-royal-blue sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">CVC</label>
                      <input required type="text" className="mt-1 block w-full border border-gray-300 rounded-none shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-blue focus:border-royal-blue sm:text-sm" />
                    </div>
                 </div>
               </div>
             </div>

             <div className="flex items-center justify-between pt-6 border-t border-gray-200">
               <button type="button" onClick={onCancel} className="text-sm font-medium text-gray-600 hover:text-gray-500">
                 Return to Cart
               </button>
               <button
                type="submit"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-none text-white bg-royal-blue hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-blue"
               >
                 <Lock className="h-4 w-4 mr-2" /> Pay Now
               </button>
             </div>
           </form>
         )}
       </div>
    </div>
  );
};

export default Checkout;