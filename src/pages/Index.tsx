
import { useState, useEffect } from "react";
import { Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AskEddyChat from "@/components/AskEddyChat";
import StepIndicator from "@/components/StepIndicator";
import BrainstormStep from "@/components/BrainstormStep";
import OutlineStep from "@/components/OutlineStep";
import WriteStep from "@/components/WriteStep";
import { toast } from "@/hooks/use-toast";

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

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(100); // 01:40 in seconds
  const [showAskEddy, setShowAskEddy] = useState(false);
  const [essayContent, setEssayContent] = useState("");
  
  const [outline, setOutline] = useState<OutlineData>({
    introduction: "",
    bodyParagraphs: [
      { id: "1", mainPoint: "", evidence: "", source: "" }
    ],
    conclusion: ""
  });

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (essayContent.trim()) {
        localStorage.setItem('ielts-essay-draft', essayContent);
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [essayContent]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      toast({
        title: `Step ${currentStep + 1}`,
        description: currentStep === 1 ? "Time to create your outline" : "Time to write your essay",
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <BrainstormStep onNext={nextStep} />;
      case 2:
        return (
          <OutlineStep
            outline={outline}
            setOutline={setOutline}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <WriteStep
            outline={outline}
            essayContent={essayContent}
            setEssayContent={setEssayContent}
            onPrev={prevStep}
          />
        );
      default:
        return <BrainstormStep onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Timer and Progress */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-gray-900">IELTS Writing Practice</h1>
              <StepIndicator currentStep={currentStep} />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-red-50 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-red-500" />
                <span className="font-mono text-red-600 font-semibold">{formatTime(timeLeft)}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAskEddy(!showAskEddy)}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Ask Eddy
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className={`grid gap-6 ${showAskEddy ? 'grid-cols-12' : 'grid-cols-1'}`}>
          <div className={showAskEddy ? 'col-span-9' : 'col-span-12'}>
            {renderCurrentStep()}
          </div>

          {/* Ask Eddy Panel */}
          {showAskEddy && (
            <div className="col-span-3">
              <div className="sticky top-24">
                <AskEddyChat onClose={() => setShowAskEddy(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
