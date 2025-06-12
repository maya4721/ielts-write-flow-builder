
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuestionCard from './QuestionCard';

interface BrainstormStepProps {
  onNext: () => void;
}

const BrainstormStep = ({ onNext }: BrainstormStepProps) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Left Column - Question */}
      <QuestionCard showAnalysis={true} />

      {/* Right Column - Brainstorm Guide */}
      <Card className="bg-white shadow-lg border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-blue-900 text-xl">Brainstorm</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Why start school early?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Think about the benefits of early education, social development, preparation for academic life, structured learning environment, peer interaction, and academic foundation building.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Why start school later?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Consider childhood development, play-based learning, family time, individual readiness, emotional maturity, and natural development pace.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Your Opinion</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                What do you think is the ideal age? Why? Consider the balance between early learning opportunities and natural development needs.
              </p>
            </div>
          </div>

          <Button 
            onClick={onNext} 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors duration-200"
          >
            Next Step
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrainstormStep;
