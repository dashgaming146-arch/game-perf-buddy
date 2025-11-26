import { useState } from "react";
import { Hero } from "@/components/Hero";
import { SpecsInput } from "@/components/SpecsInput";
import { AnalysisResults } from "@/components/AnalysisResults";
import { Footer } from "@/components/Footer";

export interface GameSpecs {
  game: string;
  gpu: string;
  cpu: string;
  ram: string;
}

export interface AnalysisResult {
  canRun: boolean;
  minimumMet: boolean;
  recommendedMet: boolean;
  fpsEstimates: {
    low720p: number;
    medium1080p: number;
    high1080p: number;
    ultra1440p: number;
  };
  recommendations: {
    resolution: string;
    settings: string;
    expectedFps: number;
    reasoning: string;
  };
  gameRequirements: {
    minimum: {
      gpu: string;
      cpu: string;
      ram: string;
    };
    recommended: {
      gpu: string;
      cpu: string;
      ram: string;
    };
  };
}

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (specs: GameSpecs) => {
    setIsAnalyzing(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-game-specs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(specs),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze specs");
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error analyzing specs:", error);
      // Show error to user
      alert("Failed to analyze specs. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <main className="container mx-auto px-4 py-12">
        <SpecsInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        {analysisResult && <AnalysisResults result={analysisResult} />}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
