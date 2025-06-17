
import { useState } from "react";
import Header from "@/components/Header";
import WritingSidebar from "@/components/WritingSidebar";
import EnhanceModal from "@/components/EnhanceModal";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PanelRight } from "lucide-react";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEnhanceModalOpen, setIsEnhanceModalOpen] = useState(false);
  const [textContent, setTextContent] = useState("");

  const handleEnhanceText = () => {
    setIsEnhanceModalOpen(true);
  };

  const handleAcceptEnhancement = (enhancedText: string) => {
    setTextContent(enhancedText);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex pt-16">
        <main className="flex-1 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto py-8 sm:py-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                AI-Powered Writing Assistant
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform your writing with intelligent suggestions, grammar checks, and style improvements powered by advanced AI.
              </p>
            </div>
            
            {/* Main Editor Area */}
            <div className="bg-card rounded-xl border shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
              <div className="p-6 sm:p-8">
                <Textarea
                  placeholder="Start writing here..."
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  className="min-h-[400px] sm:min-h-[500px] resize-none border-0 bg-transparent text-base sm:text-lg leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
                />
              </div>
              
              {/* Sidebar Toggle Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="absolute top-4 right-4 md:hidden"
              >
                <PanelRight className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Quick Actions Bar */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button 
                onClick={handleEnhanceText}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Enhance Text
              </button>
              <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors">
                Check Grammar
              </button>
              <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors">
                Improve Style
              </button>
              <Button
                variant="outline"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hidden md:flex items-center gap-2"
              >
                <PanelRight className="h-4 w-4" />
                Writing Assistant
              </Button>
            </div>
          </div>
        </main>

        {/* Desktop Sidebar */}
        <aside className={`hidden md:block transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-0'}`}>
          <WritingSidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
        </aside>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <WritingSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      </div>

      {/* Enhance Modal */}
      <EnhanceModal
        isOpen={isEnhanceModalOpen}
        onClose={() => setIsEnhanceModalOpen(false)}
        originalText={textContent}
        onAccept={handleAcceptEnhancement}
      />
    </div>
  );
};

export default Index;
