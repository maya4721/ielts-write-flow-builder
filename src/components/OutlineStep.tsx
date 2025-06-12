
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import QuestionCard from './QuestionCard';
import SampleOutlinePopup from './SampleOutlinePopup';

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

interface OutlineStepProps {
  outline: OutlineData;
  setOutline: React.Dispatch<React.SetStateAction<OutlineData>>;
  onNext: () => void;
  onPrev: () => void;
}

const OutlineStep = ({ outline, setOutline, onNext, onPrev }: OutlineStepProps) => {
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

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Left Column - Question + Sample */}
      <div className="space-y-6">
        <QuestionCard showAnalysis={true} />
        <div className="mt-4">
          <SampleOutlinePopup />
        </div>
      </div>

      {/* Right Column - Outline Form */}
      <Card className="bg-white shadow-lg border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-blue-900 text-xl">Outline</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Introduction */}
          <div className="space-y-2">
            <Label htmlFor="introduction" className="text-sm font-semibold text-orange-600">Introduction</Label>
            <Textarea
              id="introduction"
              placeholder="Write your introduction outline here..."
              value={outline.introduction}
              onChange={(e) => setOutline(prev => ({ ...prev, introduction: e.target.value }))}
              className="mt-2 resize-none border-gray-200 focus:border-orange-400 focus:ring-orange-400"
              rows={3}
            />
          </div>

          {/* Body Paragraphs */}
          {outline.bodyParagraphs.map((paragraph, index) => (
            <div key={paragraph.id} className="space-y-3 p-4 border border-gray-100 rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-orange-600">
                  Body paragraph {index + 1}
                </Label>
                {outline.bodyParagraphs.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBodyParagraph(paragraph.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
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
                  className="text-sm border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                />
                <Input
                  placeholder="Evidence/Example"
                  value={paragraph.evidence}
                  onChange={(e) => updateBodyParagraph(paragraph.id, 'evidence', e.target.value)}
                  className="text-sm border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                />
                <Input
                  placeholder="Source"
                  value={paragraph.source}
                  onChange={(e) => updateBodyParagraph(paragraph.id, 'source', e.target.value)}
                  className="text-sm border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={addBodyParagraph}
            className="w-full border-dashed border-2 border-orange-300 text-orange-600 hover:bg-orange-50 py-3"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Body Paragraph
          </Button>

          {/* Conclusion */}
          <div className="space-y-2">
            <Label htmlFor="conclusion" className="text-sm font-semibold text-orange-600">Conclusion</Label>
            <Textarea
              id="conclusion"
              placeholder="Write your conclusion outline here..."
              value={outline.conclusion}
              onChange={(e) => setOutline(prev => ({ ...prev, conclusion: e.target.value }))}
              className="mt-2 resize-none border-gray-200 focus:border-orange-400 focus:ring-orange-400"
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onPrev} className="flex-1 border-gray-300">
              Back
            </Button>
            <Button onClick={onNext} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
              Next Step
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutlineStep;
