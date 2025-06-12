
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AskEddyChatProps {
  onClose?: () => void;
}

const AskEddyChat = ({ onClose }: AskEddyChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Eddy, your AI writing assistant. How can I help you with your IELTS essay?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=AIzaSyB9Hor4Uzan5h3aVk7VtIjCDwHT-yGdBJ4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are Eddy, an IELTS writing assistant. Help the user with their IELTS essay. User question: ${inputMessage}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Eddy');
      }

      const data = await response.json();
      const assistantResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that request.";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      toast({
        title: "Error",
        description: "Failed to get response from Eddy. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="bg-white shadow-lg border-0 h-full flex flex-col">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Ask Eddy
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              ×
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${
                message.role === 'user' 
                  ? 'bg-blue-50 ml-8 text-right' 
                  : 'bg-gray-50 mr-8'
              } p-3 rounded-lg`}
            >
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{message.content}</p>
              <span className="text-xs text-gray-500">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="bg-gray-50 mr-8 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Eddy is thinking...</p>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <Textarea
            placeholder="Ask me anything about your essay..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="resize-none"
            rows={3}
            disabled={isLoading}
          />
          <Button 
            onClick={sendMessage} 
            className="w-full bg-purple-500 hover:bg-purple-600"
            disabled={isLoading || !inputMessage.trim()}
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AskEddyChat;
