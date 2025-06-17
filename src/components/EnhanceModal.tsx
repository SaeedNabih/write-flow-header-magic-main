
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface EnhanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  onAccept: (enhancedText: string) => void;
}

const EnhanceModal = ({ isOpen, onClose, originalText, onAccept }: EnhanceModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [enhancedText, setEnhancedText] = useState("");

  useEffect(() => {
    if (isOpen && originalText) {
      setIsLoading(true);
      setEnhancedText("");
      
      // Simulate AI processing
      setTimeout(() => {
        const enhanced = enhanceText(originalText);
        setEnhancedText(enhanced);
        setIsLoading(false);
      }, 2000);
    }
  }, [isOpen, originalText]);

  const enhanceText = (text: string) => {
    // Simple text enhancement simulation
    if (!text.trim()) return "Start writing to see AI enhancements...";
    
    return text
      .replace(/\bgood\b/gi, "excellent")
      .replace(/\bbig\b/gi, "substantial")
      .replace(/\bnice\b/gi, "remarkable")
      .replace(/\bthing\b/gi, "element")
      .replace(/\. /g, ". Furthermore, ")
      .replace(/^/, "Refined version: ");
  };

  const handleAccept = () => {
    onAccept(enhancedText);
    onClose();
  };

  const handleDismiss = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            AI Enhanced Suggestions
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Original Text */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Original Text</h3>
            <div className="p-4 bg-muted/30 rounded-lg border">
              <p className="text-sm leading-relaxed">
                {originalText || "No text selected"}
              </p>
            </div>
          </div>

          {/* Enhanced Text */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Enhanced Text</h3>
            <div className="p-4 bg-primary/5 rounded-lg border min-h-[120px] flex items-center justify-center">
              {isLoading ? (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm">AI is enhancing your text...</span>
                </div>
              ) : (
                <p className="text-sm leading-relaxed w-full">
                  {enhancedText}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleDismiss}
              disabled={isLoading}
            >
              Dismiss
            </Button>
            <Button
              onClick={handleAccept}
              disabled={isLoading || !enhancedText}
            >
              Accept Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhanceModal;
