import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalysisResult } from "@/pages/Index";
import { CheckCircle2, XCircle, TrendingUp, Monitor, Settings, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  const getFpsColor = (fps: number) => {
    if (fps >= 60) return "text-success";
    if (fps >= 30) return "text-warning";
    return "text-destructive";
  };

  const getFpsProgress = (fps: number) => {
    return Math.min((fps / 120) * 100, 100);
  };

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
          </CardContent>
        </Card>
      </div>

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
