import { AlertTriangle } from "lucide-react";
import modernTechLogo from "@/assets/modern-technologies-logo.png";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Important Notice */}
        <div className="mb-6 rounded-lg border border-warning/30 bg-warning/10 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 shrink-0 text-warning" />
            <div>
              <h3 className="mb-2 font-semibold text-warning">⚠️ Important Notice:</h3>
              <p className="text-sm text-foreground/90">
                We have detected that some advertisements displayed on this website may be fraudulent or misleading. 
                Please exercise caution and avoid sharing personal, financial, or sensitive information through any ads 
                you encounter here. Your safety is our priority.
              </p>
              <p className="mt-2 text-sm font-medium text-foreground/90">
                Thank you for staying alert.
              </p>
            </div>
          </div>
        </div>

        {/* Modern Technologies Logo and Text */}
        <div className="flex flex-col items-center justify-center gap-4 py-6">
          <img 
            src={modernTechLogo} 
            alt="Modern Technologies Logo" 
            className="h-24 w-auto"
          />
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Modern Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
