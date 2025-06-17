
import { useState } from "react";
import { ChevronDown, ChevronRight, Lightbulb, BookOpen, Palette, Type, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import LoadingSkeleton from "./LoadingSkeleton";

interface WritingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const WritingSidebar = ({ isOpen, onClose }: WritingSidebarProps) => {
  const [openSections, setOpenSections] = useState({
    suggestions: true,
    grammar: false,
    tone: false,
    synonyms: false,
  });

  const [loadingStates, setLoadingStates] = useState({
    suggestions: false,
    grammar: false,
    tone: false,
    synonyms: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));

    // Simulate loading when opening a section
    if (!openSections[section]) {
      setLoadingStates(prev => ({ ...prev, [section]: true }));
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [section]: false }));
      }, 1500);
    }
  };

  const aiSuggestions = [
    "Consider adding a transition sentence here",
    "This paragraph could benefit from more specific examples",
    "Try varying your sentence structure for better flow"
  ];

  const grammarTips = [
    "Replace 'very good' with 'excellent' for stronger impact",
    "Consider using active voice instead of passive",
    "Check comma usage in compound sentences"
  ];

  const toneAdjustments = [
    "Make it more professional",
    "Add a conversational tone",
    "Increase formality level",
    "Make it more persuasive"
  ];

  const synonyms = [
    { word: "important", suggestions: ["crucial", "vital", "significant"] },
    { word: "good", suggestions: ["excellent", "outstanding", "remarkable"] },
    { word: "big", suggestions: ["substantial", "massive", "enormous"] }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-background border-l shadow-lg z-50 md:relative md:top-0 md:h-full md:shadow-none">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Writing Assistant</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="md:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100%-4rem)]">
          <div className="p-4 space-y-4">
            {/* AI Suggestions */}
            <Card>
              <Collapsible 
                open={openSections.suggestions} 
                onOpenChange={() => toggleSection('suggestions')}
              >
                <CardHeader className="pb-2">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                        AI Suggestions
                      </CardTitle>
                      {openSections.suggestions ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="pt-0 space-y-2">
                    {loadingStates.suggestions ? (
                      <LoadingSkeleton count={3} />
                    ) : (
                      aiSuggestions.map((suggestion, index) => (
                        <div 
                          key={index}
                          className="p-3 rounded-lg bg-muted/50 text-sm hover:bg-muted cursor-pointer transition-colors"
                        >
                          {suggestion}
                        </div>
                      ))
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Grammar Tips */}
            <Card>
              <Collapsible 
                open={openSections.grammar} 
                onOpenChange={() => toggleSection('grammar')}
              >
                <CardHeader className="pb-2">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        Grammar Tips
                      </CardTitle>
                      {openSections.grammar ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="pt-0 space-y-2">
                    {loadingStates.grammar ? (
                      <LoadingSkeleton count={3} />
                    ) : (
                      grammarTips.map((tip, index) => (
                        <div 
                          key={index}
                          className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-sm hover:bg-blue-100 dark:hover:bg-blue-950/30 cursor-pointer transition-colors"
                        >
                          {tip}
                        </div>
                      ))
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Tone Adjustments */}
            <Card>
              <Collapsible 
                open={openSections.tone} 
                onOpenChange={() => toggleSection('tone')}
              >
                <CardHeader className="pb-2">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <Palette className="h-4 w-4 text-purple-500" />
                        Tone Adjustments
                      </CardTitle>
                      {openSections.tone ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="pt-0 space-y-2">
                    {loadingStates.tone ? (
                      <LoadingSkeleton count={4} />
                    ) : (
                      toneAdjustments.map((adjustment, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-sm"
                        >
                          {adjustment}
                        </Button>
                      ))
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Synonyms */}
            <Card>
              <Collapsible 
                open={openSections.synonyms} 
                onOpenChange={() => toggleSection('synonyms')}
              >
                <CardHeader className="pb-2">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <Type className="h-4 w-4 text-green-500" />
                        Synonyms
                      </CardTitle>
                      {openSections.synonyms ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="pt-0 space-y-3">
                    {loadingStates.synonyms ? (
                      <LoadingSkeleton count={3} />
                    ) : (
                      synonyms.map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="font-medium text-sm text-green-600 dark:text-green-400">
                            {item.word}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.suggestions.map((synonym, synIndex) => (
                              <span
                                key={synIndex}
                                className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-xs rounded cursor-pointer hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
                              >
                                {synonym}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default WritingSidebar;
