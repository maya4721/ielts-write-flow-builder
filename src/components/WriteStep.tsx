
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import QuestionCard from './QuestionCard';

interface BodyParagraph {
  id: string;
  mainPoint: string;
  evidence: string;
  source: string;
}

interface OutlineData {
  introduction: string;
  bodyParagraphs: BodyParagraph[];
  conclusion: string;
}

interface WriteStepProps {
  outline: OutlineData;
  essayContent: string;
  setEssayContent: React.Dispatch<React.SetStateAction<string>>;
  onPrev: () => void;
}

const WriteStep = ({ outline, essayContent, setEssayContent, onPrev }: WriteStepProps) => {
  const [showOutlineDetails, setShowOutlineDetails] = useState(false);

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleSubmit = () => {
    toast({ 
      title: "Essay Submitted!", 
      description: "Your essay has been submitted successfully." 
    });
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column - Question & Guide */}
      <div className="col-span-3 space-y-4">
        <QuestionCard className="text-sm" />

        <Card className="bg-white shadow-lg border-0">
          <CardContent className="p-4 space-y-4">
            <div>
              <Button
                variant="ghost"
                onClick={() => setShowOutlineDetails(!showOutlineDetails)}
                className="w-full justify-between p-2 text-blue-600 hover:bg-blue-50"
              >
                <span className="font-semibold text-sm">Step 1: Understanding</span>
                {showOutlineDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
              {showOutlineDetails && (
                <div className="mt-2 p-3 bg-blue-50 rounded text-xs text-blue-800 space-y-1">
                  <p><strong>Question type:</strong> Discuss both views + opinion</p>
                  <p><strong>Structure:</strong> Introduction → Body 1 → Body 2 → Opinion → Conclusion</p>
                </div>
              )}
            </div>

            <div>
              <Button
                variant="ghost"
                onClick={() => setShowOutlineDetails(!showOutlineDetails)}
                className="w-full justify-between p-2 text-blue-600 hover:bg-blue-50"
              >
                <span className="font-semibold text-sm">Step 2: Outline</span>
                {showOutlineDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
              {showOutlineDetails && (
                <div className="mt-2 space-y-2 p-3 bg-orange-50 rounded text-xs">
                  {outline.introduction && (
                    <div>
                      <h5 className="font-semibold text-orange-700 text-xs">Introduction:</h5>
                      <p className="text-orange-600 text-xs">{outline.introduction}</p>
                    </div>
                  )}
                  {outline.bodyParagraphs.map((para, index) => (
                    para.mainPoint && (
                      <div key={para.id}>
                        <h5 className="font-semibold text-orange-700 text-xs">Body {index + 1}:</h5>
                        <p className="text-orange-600 text-xs">{para.mainPoint}</p>
                      </div>
                    )
                  ))}
                  {outline.conclusion && (
                    <div>
                      <h5 className="font-semibold text-orange-700 text-xs">Conclusion:</h5>
                      <p className="text-orange-600 text-xs">{outline.conclusion}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Column - Writing Area */}
      <div className="col-span-9">
        <Card className="bg-white shadow-lg border-0 h-full">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-blue-900 text-xl">Write</CardTitle>
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-gray-600">
                  Word count: <span className="font-semibold text-blue-600">{getWordCount(essayContent)}</span>
                </span>
                <span className="text-gray-600">
                  Grammar Errors: <span className="font-semibold text-orange-500">0</span>
                </span>
                <span className="text-gray-600">
                  Spelling Errors: <span className="font-semibold text-orange-500">0</span>
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 h-full">
            <div className="h-full flex flex-col">
              <Textarea
                placeholder="Write your IELTS essay here..."
                value={essayContent}
                onChange={(e) => setEssayContent(e.target.value)}
                className="flex-1 min-h-[500px] resize-none border-0 focus:ring-0 text-base leading-relaxed p-4 bg-gray-50"
              />
              <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-100">
                <Button 
                  variant="outline" 
                  onClick={onPrev} 
                  className="flex-1 border-gray-300"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium"
                >
                  Submit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WriteStep;
