import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AnalysisResult } from "@/pages/Index";
import { CheckCircle2, XCircle, TrendingUp, Monitor, Settings, Zap, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  const [showFpsDetails, setShowFpsDetails] = useState(false);

  const getFpsColor = (fps: number) => {
    if (fps >= 60) return "text-success";
    if (fps >= 30) return "text-warning";
    return "text-destructive";
  };

  const getFpsProgress = (fps: number) => {
    return Math.min((fps / 120) * 100, 100);
  };

  // Generate full FPS breakdown based on existing estimates
  const generateFpsBreakdown = () => {
    const base1080pMedium = result.fpsEstimates.medium1080p;
    
    // Scale factors for resolutions relative to 1080p
    const resolutionScales = {
      "720p": 1.6,
      "1080p": 1.0,
      "1440p": 0.7,
      "4K": 0.4,
      "8K": 0.15,
    };

    // Scale factors for settings relative to medium
    const settingScales = {
      low: 1.4,
      medium: 1.0,
      high: 0.75,
      ultra: 0.55,
    };

    const resolutions = ["720p", "1080p", "1440p", "4K", "8K"] as const;
    const settings = ["low", "medium", "high", "ultra"] as const;

    return resolutions.map((res) => ({
      resolution: res === "8K" ? "8K Ultra" : res,
      fps: settings.map((setting) => ({
        setting: setting.charAt(0).toUpperCase() + setting.slice(1),
        value: Math.round(base1080pMedium * resolutionScales[res] * settingScales[setting]),
      })),
    }));
  };

  const fpsBreakdown = generateFpsBreakdown();

  return (
    <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Overall Status */}
      <Card className="border-border/50 bg-card-gradient shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Analysis Complete</CardTitle>
              <CardDescription>Here's how your system performs</CardDescription>
            </div>
            <div className="flex gap-2">
              {result.minimumMet ? (
                <Badge className="bg-success/20 text-success border-success/30 glow-success">
                  <CheckCircle2 className="mr-1 h-4 w-4" />
                  Playable
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="mr-1 h-4 w-4" />
                  Below Minimum
                </Badge>
              )}
              {result.recommendedMet && (
                <Badge className="bg-primary/20 text-primary border-primary/30 glow-primary">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  Recommended Met
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* System Requirements Comparison */}
        <Card className="border-border/50 bg-card-gradient shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              Requirements Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-3">
                <span className="text-sm font-medium text-muted-foreground">Minimum GPU</span>
                <span className="font-mono text-sm">{result.gameRequirements.minimum.gpu}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-3">
                <span className="text-sm font-medium text-muted-foreground">Minimum CPU</span>
                <span className="font-mono text-sm">{result.gameRequirements.minimum.cpu}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-3">
                <span className="text-sm font-medium text-muted-foreground">Minimum RAM</span>
                <span className="font-mono text-sm">{result.gameRequirements.minimum.ram}</span>
              </div>
            </div>

            <div className="my-4 border-t border-border/50" />

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/10 p-3">
                <span className="text-sm font-medium">Recommended GPU</span>
                <span className="font-mono text-sm text-primary">{result.gameRequirements.recommended.gpu}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/10 p-3">
                <span className="text-sm font-medium">Recommended CPU</span>
                <span className="font-mono text-sm text-primary">{result.gameRequirements.recommended.cpu}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/10 p-3">
                <span className="text-sm font-medium">Recommended RAM</span>
                <span className="font-mono text-sm text-primary">{result.gameRequirements.recommended.ram}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FPS Estimates */}
        <Card className="border-border/50 bg-card-gradient shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-warning" />
              FPS Estimates
            </CardTitle>
            <CardDescription>Expected frames per second at different settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Low (720p)</span>
                <span className={`font-mono text-lg font-bold ${getFpsColor(result.fpsEstimates.low720p)}`}>
                  {result.fpsEstimates.low720p} FPS
                </span>
              </div>
              <Progress value={getFpsProgress(result.fpsEstimates.low720p)} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Medium (1080p)</span>
                <span className={`font-mono text-lg font-bold ${getFpsColor(result.fpsEstimates.medium1080p)}`}>
                  {result.fpsEstimates.medium1080p} FPS
                </span>
              </div>
              <Progress value={getFpsProgress(result.fpsEstimates.medium1080p)} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">High (1080p)</span>
                <span className={`font-mono text-lg font-bold ${getFpsColor(result.fpsEstimates.high1080p)}`}>
                  {result.fpsEstimates.high1080p} FPS
                </span>
              </div>
              <Progress value={getFpsProgress(result.fpsEstimates.high1080p)} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Ultra (1440p)</span>
                <span className={`font-mono text-lg font-bold ${getFpsColor(result.fpsEstimates.ultra1440p)}`}>
                  {result.fpsEstimates.ultra1440p} FPS
                </span>
              </div>
              <Progress value={getFpsProgress(result.fpsEstimates.ultra1440p)} className="h-2" />
            </div>

            <Button 
              onClick={() => setShowFpsDetails(true)}
              variant="outline"
              className="w-full mt-4 border-primary/50 hover:bg-primary/10 hover:border-primary"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              View Full FPS Details
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FPS Details Dialog */}
      <Dialog open={showFpsDetails} onOpenChange={setShowFpsDetails}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border/50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <BarChart3 className="h-5 w-5 text-primary" />
              Full FPS Breakdown
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {fpsBreakdown.map((resData, index) => (
              <div key={resData.resolution} className="space-y-3">
                <h3 className="text-lg font-bold text-primary border-b border-primary/30 pb-2">
                  {resData.resolution}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {resData.fps.map((fpsData) => (
                    <div 
                      key={`${resData.resolution}-${fpsData.setting}`}
                      className="rounded-lg border border-border/50 bg-secondary/20 p-3 text-center transition-all hover:border-primary/50 hover:bg-primary/5"
                    >
                      <div className="text-xs text-muted-foreground mb-1">{fpsData.setting}</div>
                      <div className={`font-mono text-xl font-bold ${getFpsColor(fpsData.value)}`}>
                        {fpsData.value}
                      </div>
                      <div className="text-xs text-muted-foreground">FPS</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="default" className="w-full sm:w-auto">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI Recommendations */}
      <Card className="border-primary/30 bg-card-gradient shadow-xl glow-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            AI-Powered Recommendations
          </CardTitle>
          <CardDescription>Optimal settings for the best gaming experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-center">
              <div className="mb-1 text-sm text-muted-foreground">Recommended Resolution</div>
              <div className="text-2xl font-bold text-primary">{result.recommendations.resolution}</div>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-center">
              <div className="mb-1 text-sm text-muted-foreground">Graphics Settings</div>
              <div className="text-2xl font-bold text-primary">{result.recommendations.settings}</div>
            </div>
            <div className="rounded-lg border border-success/30 bg-success/10 p-4 text-center">
              <div className="mb-1 text-sm text-muted-foreground">Expected FPS</div>
              <div className="text-2xl font-bold text-success">{result.recommendations.expectedFps} FPS</div>
            </div>
          </div>

          <div className="rounded-lg border border-border/50 bg-secondary/30 p-4">
            <p className="text-sm leading-relaxed text-foreground">{result.recommendations.reasoning}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};