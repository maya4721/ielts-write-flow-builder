
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface QuestionCardProps {
  showAnalysis?: boolean;
  className?: string;
}

const QuestionCard = ({ showAnalysis = false, className = "" }: QuestionCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className={`bg-white shadow-lg border-0 ${className}`}>
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="text-xl font-semibold">Question | #12345678</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <p className="text-gray-700 leading-relaxed text-base">
          Some people think that children should start school at a very early age, but others believe that they should not go to school until they are older. Discuss both these views and give your opinion.
        </p>
        
        {showAnalysis && (
          <>
            <Button 
              variant="outline" 
              onClick={() => setShowDetails(!showDetails)}
              className="mt-4 border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              {showDetails ? 'Hide' : 'View'} Question Analysis
              {showDetails ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>
            
            {showDetails && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-3">Step 1: Understanding</h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <p><strong>Topic:</strong> Children's school starting age</p>
                  <p><strong>Task:</strong> Discuss both views + give opinion</p>
                  <p><strong>Structure:</strong> Introduction → Body 1 (early start) → Body 2 (later start) → Opinion → Conclusion</p>
                  <p><strong>Key words:</strong> early age, older, discuss both views, your opinion</p>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
