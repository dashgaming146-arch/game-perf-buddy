import { useState } from "react";
import { Hero } from "@/components/Hero";
import { SpecsInput } from "@/components/SpecsInput";
import { AnalysisResults } from "@/components/AnalysisResults";

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
    // TODO: Call AI backend for analysis
    // For now, simulate with timeout
    setTimeout(() => {
      setAnalysisResult({
        canRun: true,
        minimumMet: true,
        recommendedMet: true,
        fpsEstimates: {
          low720p: 90,
          medium1080p: 60,
          high1080p: 45,
          ultra1440p: 30,
        },
        recommendations: {
          resolution: "1080p",
          settings: "Medium",
          expectedFps: 60,
          reasoning: "Your system exceeds the minimum requirements. For optimal performance, we recommend Medium settings at 1080p for smooth 60 FPS gameplay.",
        },
        gameRequirements: {
          minimum: {
            gpu: "GTX 960",
            cpu: "i5-2500K",
            ram: "8GB",
          },
          recommended: {
            gpu: "RTX 2060",
            cpu: "i7-8700K",
            ram: "16GB",
          },
        },
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <main className="container mx-auto px-4 py-12">
        <SpecsInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        {analysisResult && <AnalysisResults result={analysisResult} />}
      </main>
    </div>
  );
};

export default Index;
