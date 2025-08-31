import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Chatbot = ({ isOpen, onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Navin\'s portfolio chatbot. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const chatCardRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (chatCardRef.current && !chatCardRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://fly-arriving-earwig.ngrok-free.app/webhook/c958b74f-390f-4634-963f-3d284f057bca/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      let responseText = '';

      if (contentType.includes('application/json')) {
        try {
          const data = await response.json();
          
          // Check if this is an execution started response
          if (data.executionStarted && data.executionId) {
            const executionId = data.executionId;
            responseText = await waitForExecutionResult(executionId);
          } else if (data.output && data.output.response) {
            // Handle the specific format: {"output":{"response":"..."}}
            responseText = data.output.response;
          } else {
            responseText = typeof data === 'string' ? data : (data.message ?? data.text ?? data.response ?? JSON.stringify(data));
          }
        } catch {
          responseText = await response.text();
        }
      } else {
        responseText = await response.text();
      }

      // Strip any HTML tags to ensure plain text only
      responseText = responseText.replace(/<[^>]*>/g, '').trim();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again later.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const waitForExecutionResult = async (executionId: string): Promise<string> => {
    const maxAttempts = 30;
    const pollInterval = 1000;
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        await new Promise(resolve => setTimeout(resolve, pollInterval));
        
        const resultResponse = await fetch(`https://fly-arriving-earwig.ngrok-free.app/webhook/c958b74f-390f-4634-963f-3d284f057bca/result/${executionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (resultResponse.ok) {
          const resultData = await resultResponse.text();
          if (resultData && resultData.trim() !== '') {
            return resultData;
          }
        }
      } catch (error) {
        console.log(`Polling attempt ${attempt + 1} failed:`, error);
      }
    }
    
    return 'Response took too long. Please try again.';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestions = [
    'What is your current role?',
    'What are your technical skills?',
    'Tell me about your education',
    'How can I contact you?',
    'Where can I find your social media?'
  ];

  const sendSuggestion = async (suggestion: string) => {
    if (!suggestion.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: suggestion,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('https://fly-arriving-earwig.ngrok-free.app/webhook/c958b74f-390f-4634-963f-3d284f057bca/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: suggestion,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      let responseText = '';

      if (contentType.includes('application/json')) {
        try {
          const data = await response.json();
          
          if (data.executionStarted && data.executionId) {
            const executionId = data.executionId;
            responseText = await waitForExecutionResult(executionId);
          } else if (data.output && data.output.response) {
            responseText = data.output.response;
          } else {
            responseText = typeof data === 'string' ? data : (data.message ?? data.text ?? data.response ?? JSON.stringify(data));
          }
        } catch {
          responseText = await response.text();
        }
      } else {
        responseText = await response.text();
      }

      responseText = responseText.replace(/<[^>]*>/g, '').trim();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again later.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div 
        ref={chatCardRef}
        className="bg-card rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden border border-border"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-5 text-center relative">
          <h1 className="text-xl font-semibold mb-1">Navin Singh</h1>
          <p className="text-sm opacity-90">AI Engineer | Ask me anything about my experience and skills</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 p-0 rounded-lg text-primary-foreground hover:bg-white/20 transition-all duration-300"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Suggestions */}
        <div className="p-4 pb-2 flex flex-wrap gap-2 bg-card">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => sendSuggestion(suggestion)}
              className="px-3 py-1.5 bg-muted hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary rounded-2xl text-xs transition-all duration-300 cursor-pointer"
            >
              {suggestion.replace(/^What (is|are) your /, '').replace(/^Tell me about your /, '').replace(/^How can I /, '').replace(/^Where can I find your /, '')}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div 
          className="flex-1 p-4 pt-2 overflow-y-auto bg-muted/20"
          ref={scrollAreaRef}
        >
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed break-words",
                    message.isUser
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card border border-border text-card-foreground rounded-bl-sm"
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-3 py-2 max-w-[85%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-card border-t border-border flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about Navin's experience, skills, or contact info..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 border-2 border-border focus:border-primary rounded-2xl text-sm bg-background focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="sm"
            className={cn(
              "px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl text-sm transition-all duration-300",
              (!inputValue.trim() || isLoading) && "opacity-50 cursor-not-allowed"
            )}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};