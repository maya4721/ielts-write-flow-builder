
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";

const SampleOutlinePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sampleOutline = {
    introduction: "Hook: Many parents today face the dilemma of when to start their children's formal education. Thesis: While early schooling offers academic advantages, I believe children should start school around age 6-7 to ensure proper developmental readiness.",
    bodyParagraphs: [
      {
        mainPoint: "Benefits of early school start",
        evidence: "Children develop social skills, structured learning habits, and academic foundation earlier",
        source: "Educational psychology research (Smith, 2020)"
      },
      {
        mainPoint: "Advantages of later school start", 
        evidence: "Children have more time for play-based learning, emotional maturity, and family bonding",
        source: "Child development studies (Johnson, 2019)"
      },
      {
        mainPoint: "My opinion - balanced approach",
        evidence: "Age 6-7 provides optimal balance between developmental readiness and academic preparation",
        source: "Personal observation and expert recommendations"
      }
    ],
    conclusion: "Restate thesis: While both approaches have merit, starting school at 6-7 years old provides the best balance. Final thought: Education should adapt to child development, not rush it."
  };

  const newsArticle = {
    title: "New Study Reveals Optimal Age for School Entry",
    content: "A comprehensive study published in the Journal of Educational Psychology found that children who start formal education between ages 6-7 show better long-term academic performance and emotional well-being compared to earlier starters. The research, conducted over 10 years with 5,000 participants, suggests that play-based learning in early years is crucial for cognitive development. 'Children need time to develop essential skills through play before transitioning to formal academic instruction,' said Dr. Sarah Martinez, lead researcher."
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
          <Eye className="w-4 h-4 mr-2" />
          View Sample Outline & Research
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sample Outline & Supporting Research</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Sample Outline */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 text-orange-600">Sample Outline</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-orange-600 mb-2">Introduction</h4>
                  <p className="text-sm text-gray-700">{sampleOutline.introduction}</p>
                </div>

                {sampleOutline.bodyParagraphs.map((para, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-orange-600 mb-2">Body Paragraph {index + 1}</h4>
                    <div className="pl-4 space-y-1">
                      <p className="text-sm"><strong>Main Point:</strong> {para.mainPoint}</p>
                      <p className="text-sm"><strong>Evidence:</strong> {para.evidence}</p>
                      <p className="text-sm"><strong>Source:</strong> {para.source}</p>
                    </div>
                  </div>
                ))}

                <div>
                  <h4 className="font-semibold text-orange-600 mb-2">Conclusion</h4>
                  <p className="text-sm text-gray-700">{sampleOutline.conclusion}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* News Article */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 text-blue-600">Related Research Article</h3>
              <h4 className="font-semibold mb-3">{newsArticle.title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{newsArticle.content}</p>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SampleOutlinePopup;
