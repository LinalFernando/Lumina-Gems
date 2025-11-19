import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, X } from 'lucide-react';
import { Product, ChatMessage } from '../types';
import { askGemologist } from '../services/geminiService';

interface GemologistChatProps {
  product: Product;
  onClose: () => void;
}

const GemologistChat: React.FC<GemologistChatProps> = ({ product, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Greetings. I am the AI Gemologist for Lanka Gems. I see you are admiring the ${product.name}. How may I assist you with its details today?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await askGemologist(product, userMsg.text);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 h-[500px] overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-royal-blue p-4 flex justify-between items-center text-white">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-gold-accent mr-2" />
          <h3 className="font-medium">Lumina Gemologist</h3>
        </div>
        <button onClick={onClose} className="text-gray-300 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mx-2 ${msg.role === 'user' ? 'bg-gray-200' : 'bg-royal-blue'}`}>
                {msg.role === 'user' ? <User className="h-4 w-4 text-gray-600" /> : <Sparkles className="h-4 w-4 text-gold-accent" />}
              </div>
              <div className={`p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-royal-blue text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex flex-row items-center ml-12">
              <span className="animate-bounce mx-1 text-gray-400">.</span>
              <span className="animate-bounce mx-1 text-gray-400 delay-75">.</span>
              <span className="animate-bounce mx-1 text-gray-400 delay-150">.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about clarity, history..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent text-sm"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-royal-blue text-white p-2 rounded-full hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GemologistChat;