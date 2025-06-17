
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: (checked: boolean) => void;
}

const MobileMenu = ({ isOpen, onClose, isDarkMode, onToggleDarkMode }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-16 left-0 right-0 bg-background border-b shadow-lg">
        <div className="px-4 py-6 space-y-4">
          <Button size="lg" className="w-full font-medium" onClick={onClose}>
            Enhance Text
          </Button>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Dark Mode</span>
              <Moon className="h-4 w-4 text-muted-foreground" />
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={onToggleDarkMode}
              aria-label="Toggle dark mode"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
