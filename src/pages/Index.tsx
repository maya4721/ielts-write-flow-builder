
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, Clock, MessageCircle, Plus, Trash2 } from "lucide-react";
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
  const [showOutlineDetails, setShowOutlineDetails] = useState(false);
  const [showOutlineInWrite, setShowOutlineInWrite] = useState(false);
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

  const addBodyParagraph = () => {
    const newId = (outline.bodyParagraphs.length + 1).toString();
    setOutline(prev => ({
      ...prev,
      bodyParagraphs: [...prev.bodyParagraphs, { id: newId, mainPoint: "", evidence: "", source: "" }]
    }));
  };

  const removeBodyParagraph = (id: string) => {
    if (outline.bodyParagraphs.length > 1) {
      setOutline(prev => ({
        ...prev,
        bodyParagraphs: prev.bodyParagraphs.filter(p => p.id !== id)
      }));
    }
  };

  const updateBodyParagraph = (id: string, field: keyof BodyParagraph, value: string) => {
    setOutline(prev => ({
      ...prev,
      bodyParagraphs: prev.bodyParagraphs.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      )
    }));
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Timer and Progress */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-gray-900">IELTS Writing Practice</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>1</div>
                  <span className={`text-sm ${currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                    Brainstorm
                  </span>
                </div>
                <div className="w-12 h-0.5 bg-gray-300">
                  <div className={`h-full bg-blue-500 transition-all duration-500 ${
                    currentStep >= 2 ? 'w-full' : 'w-0'
                  }`} />
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>2</div>
                  <span className={`text-sm ${currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                    Outline
                  </span>
                </div>
                <div className="w-12 h-0.5 bg-gray-300">
                  <div className={`h-full bg-blue-500 transition-all duration-500 ${
                    currentStep >= 3 ? 'w-full' : 'w-0'
                  }`} />
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>3</div>
                  <span className={`text-sm ${currentStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                    Write
                  </span>
                </div>
              </div>
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
            {/* Step 1: Brainstorm */}
            {currentStep === 1 && (
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column - Question */}
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <CardTitle className="text-xl">Question | #12345678</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Some people think that children should start school at a very early age, but others believe that they should not go to school until they are older. Discuss both these views and give your opinion.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowOutlineDetails(!showOutlineDetails)}
                      className="mt-4"
                    >
                      {showOutlineDetails ? 'Hide' : 'View'} Question Analysis
                      {showOutlineDetails ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                    </Button>
                    {showOutlineDetails && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Question Analysis:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Topic: Children's school starting age</li>
                          <li>• Task: Discuss both views + give opinion</li>
                          <li>• Structure: Introduction → Body 1 → Body 2 → Opinion → Conclusion</li>
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Right Column - Brainstorm Guide */}
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-blue-900">Brainstorm</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Why start school early?</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Think about the benefits of early education, social development, preparation for academic life, etc.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Why start school later?</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Consider childhood development, play-based learning, family time, individual readiness, etc.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Your Opinion</h3>
                      <p className="text-sm text-gray-600">
                        What do you think is the ideal age? Why? Consider balance between early learning and natural development.
                      </p>
                    </div>

                    <Button onClick={nextStep} className="w-full bg-blue-500 hover:bg-blue-600">
                      Next Step
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Outline */}
            {currentStep === 2 && (
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column - Question */}
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <CardTitle className="text-xl">Question | #12345678</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700 leading-relaxed">
                      Some people think that children should start school at a very early age, but others believe that they should not go to school until they are older. Discuss both these views and give your opinion.
                    </p>
                  </CardContent>
                </Card>

                {/* Right Column - Outline Form */}
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-blue-900">Outline</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Introduction */}
                    <div>
                      <Label htmlFor="introduction" className="text-sm font-semibold text-orange-600">Introduction</Label>
                      <Textarea
                        id="introduction"
                        placeholder="Write your introduction outline here..."
                        value={outline.introduction}
                        onChange={(e) => setOutline(prev => ({ ...prev, introduction: e.target.value }))}
                        className="mt-2 resize-none"
                        rows={3}
                      />
                    </div>

                    {/* Body Paragraphs */}
                    {outline.bodyParagraphs.map((paragraph, index) => (
                      <div key={paragraph.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-semibold text-orange-600">
                            Body paragraph {index + 1}
                          </Label>
                          {outline.bodyParagraphs.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBodyParagraph(paragraph.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Input
                            placeholder="Main point/Topic"
                            value={paragraph.mainPoint}
                            onChange={(e) => updateBodyParagraph(paragraph.id, 'mainPoint', e.target.value)}
                            className="text-sm"
                          />
                          <Input
                            placeholder="Evidence/Example"
                            value={paragraph.evidence}
                            onChange={(e) => updateBodyParagraph(paragraph.id, 'evidence', e.target.value)}
                            className="text-sm"
                          />
                          <Input
                            placeholder="Source"
                            value={paragraph.source}
                            onChange={(e) => updateBodyParagraph(paragraph.id, 'source', e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={addBodyParagraph}
                      className="w-full border-dashed border-2 border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Body Paragraph
                    </Button>

                    {/* Conclusion */}
                    <div>
                      <Label htmlFor="conclusion" className="text-sm font-semibold text-orange-600">Conclusion</Label>
                      <Textarea
                        id="conclusion"
                        placeholder="Write your conclusion outline here..."
                        value={outline.conclusion}
                        onChange={(e) => setOutline(prev => ({ ...prev, conclusion: e.target.value }))}
                        className="mt-2 resize-none"
                        rows={3}
                      />
                    </div>

                    <div className="flex space-x-3">
                      <Button variant="outline" onClick={prevStep} className="flex-1">
                        Back
                      </Button>
                      <Button onClick={nextStep} className="flex-1 bg-blue-500 hover:bg-blue-600">
                        Next Step
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Write */}
            {currentStep === 3 && (
              <div className="grid grid-cols-12 gap-6">
                {/* Left Column - Question & Guide */}
                <div className="col-span-3 space-y-4">
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                      <CardTitle className="text-lg">Question | #12345678</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Some people think that children should start school at a very early age, but others believe that they should not go to school until they are older. Discuss both these views and give your opinion.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-lg border-0">
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <Button
                          variant="ghost"
                          onClick={() => setShowOutlineInWrite(!showOutlineInWrite)}
                          className="w-full justify-between p-2 text-blue-600"
                        >
                          <span className="font-semibold">Step 1: Understanding</span>
                          {showOutlineInWrite ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                        {showOutlineInWrite && (
                          <div className="mt-2 p-3 bg-blue-50 rounded text-sm text-blue-800">
                            <p>Question type: Discuss both views + opinion</p>
                            <p>Structure: Introduction → Body 1 → Body 2 → Opinion → Conclusion</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <Button
                          variant="ghost"
                          onClick={() => setShowOutlineInWrite(!showOutlineInWrite)}
                          className="w-full justify-between p-2 text-blue-600"
                        >
                          <span className="font-semibold">Step 2: Outline</span>
                          {showOutlineInWrite ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                        {showOutlineInWrite && (
                          <div className="mt-2 space-y-3 p-3 bg-orange-50 rounded text-sm">
                            {outline.introduction && (
                              <div>
                                <h5 className="font-semibold text-orange-700">Introduction:</h5>
                                <p className="text-orange-600">{outline.introduction}</p>
                              </div>
                            )}
                            {outline.bodyParagraphs.map((para, index) => (
                              <div key={para.id}>
                                <h5 className="font-semibold text-orange-700">Body {index + 1}:</h5>
                                <p className="text-orange-600">{para.mainPoint}</p>
                              </div>
                            ))}
                            {outline.conclusion && (
                              <div>
                                <h5 className="font-semibold text-orange-700">Conclusion:</h5>
                                <p className="text-orange-600">{outline.conclusion}</p>
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
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-blue-900">Write</CardTitle>
                        <div className="flex items-center space-x-4 text-sm">
                          <span>Word count: <span className="font-semibold">{getWordCount(essayContent)}</span></span>
                          <span>Grammar Errors: <span className="font-semibold text-orange-500">0</span></span>
                          <span>Spelling Errors: <span className="font-semibold text-orange-500">0</span></span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <Textarea
                        placeholder="Write your IELTS essay here..."
                        value={essayContent}
                        onChange={(e) => setEssayContent(e.target.value)}
                        className="min-h-[500px] resize-none border-0 focus:ring-0 text-base leading-relaxed"
                      />
                      <div className="flex space-x-3 mt-6">
                        <Button variant="outline" onClick={prevStep} className="flex-1">
                          Back
                        </Button>
                        <Button 
                          className="flex-1 bg-red-500 hover:bg-red-600"
                          onClick={() => toast({ title: "Essay Submitted!", description: "Your essay has been submitted successfully." })}
                        >
                          Submit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Ask Eddy Panel */}
          {showAskEddy && (
            <div className="col-span-3">
              <Card className="bg-white shadow-lg border-0 sticky top-24">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <CardTitle className="text-lg flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Ask Eddy
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Hi! I'm Eddy, your AI writing assistant. How can I help you with your IELTS essay?
                      </p>
                    </div>
                    <Textarea
                      placeholder="Ask me anything about your essay..."
                      className="resize-none"
                      rows={3}
                    />
                    <Button className="w-full bg-purple-500 hover:bg-purple-600">
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
