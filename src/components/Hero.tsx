import { Cpu, Gauge, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border/50">
      <div className="absolute inset-0 bg-gaming-gradient opacity-30" />
      <div className="container relative mx-auto px-4 py-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Gaming Analysis</span>
        </div>
        
        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="text-gradient-primary">Can Your PC</span>
          <br />
          <span className="text-foreground">Run This Game?</span>
        </h1>
        
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Get instant AI-powered analysis of your PC specs. Discover optimal settings, 
          expected FPS, and recommendations for the best gaming experience.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            <span className="text-foreground">Instant Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-success" />
            <span className="text-foreground">FPS Predictions</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-warning" />
            <span className="text-foreground">AI Recommendations</span>
          </div>
        </div>
      </div>
    </section>
  );
};
