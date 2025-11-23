import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GameSpecs } from "@/pages/Index";
import { Loader2, Search } from "lucide-react";

interface SpecsInputProps {
  onAnalyze: (specs: GameSpecs) => void;
  isAnalyzing: boolean;
}

export const SpecsInput = ({ onAnalyze, isAnalyzing }: SpecsInputProps) => {
  const [specs, setSpecs] = useState<GameSpecs>({
    game: "",
    gpu: "",
    cpu: "",
    ram: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(specs);
  };

  const handleChange = (field: keyof GameSpecs, value: string) => {
    setSpecs((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="mx-auto max-w-2xl border-border/50 bg-card-gradient shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Enter Your Details</CardTitle>
        <CardDescription>
          Input the game title and your PC specifications for instant analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="game" className="text-base">Game Title</Label>
            <Input
              id="game"
              placeholder="e.g., Call of Duty: Modern Warfare 2"
              value={specs.game}
              onChange={(e) => handleChange("game", e.target.value)}
              required
              className="border-border/50 bg-secondary/50 backdrop-blur-sm transition-all focus:glow-primary"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="gpu" className="text-base">GPU</Label>
              <Input
                id="gpu"
                placeholder="e.g., RTX 3060"
                value={specs.gpu}
                onChange={(e) => handleChange("gpu", e.target.value)}
                required
                className="border-border/50 bg-secondary/50 backdrop-blur-sm transition-all focus:glow-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpu" className="text-base">CPU</Label>
              <Input
                id="cpu"
                placeholder="e.g., i7-10700K"
                value={specs.cpu}
                onChange={(e) => handleChange("cpu", e.target.value)}
                required
                className="border-border/50 bg-secondary/50 backdrop-blur-sm transition-all focus:glow-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ram" className="text-base">RAM</Label>
              <Input
                id="ram"
                placeholder="e.g., 16GB"
                value={specs.ram}
                onChange={(e) => handleChange("ram", e.target.value)}
                required
                className="border-border/50 bg-secondary/50 backdrop-blur-sm transition-all focus:glow-primary"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isAnalyzing}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all glow-primary"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Your System...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Analyze Performance
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
