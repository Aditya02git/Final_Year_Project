import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, Loader2 } from 'lucide-react';

const AiChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // ============================================
    // TODO: INTEGRATE YOUR AI API HERE
    // ============================================
    // Example API call structure:
    /*
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
          message: input,
          // Add other parameters as needed
        })
      });
      
      const data = await response.json();
      const aiResponse = data.message; // Adjust based on your API response structure
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    */
    // ============================================

    // MOCK RESPONSE (Remove this when integrating real API)
    setTimeout(() => {
      const mockResponses = [
        "That's an interesting question! Let me help you with that.",
        "I understand what you're asking. Here's what I think...",
        "Great point! Based on what you've shared, I'd suggest...",
        "I'm here to help! Let me break this down for you.",
        "Thanks for asking! Here's a detailed response to your query."
      ];
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen py-20">

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center shadow-md ${
                message.role === 'user' 
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-500' 
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`flex flex-col max-w-[70%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`rounded-2xl px-5 py-3 shadow-md ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-tr-sm'
                    : 'bg-white border border-purple-100 text-gray-800 rounded-tl-sm'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
                <span className="text-xs text-gray-400 mt-1 px-1">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white border border-purple-100 rounded-2xl rounded-tl-sm px-5 py-3 shadow-md">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className=" backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="relative flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                rows="1"
                disabled={isTyping}
                className="w-full px-5 py-3 pr-12 rounded-2xl border-2 border-blue-200 focus:blue-purple-400 focus:outline-none resize-none bg-white shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 placeholder-gray-400"
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed disabled:hover:shadow-lg group"
            >
              {isTyping ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
          
          <p className="text-xs text-gray-400 mt-2 text-center">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiChat;