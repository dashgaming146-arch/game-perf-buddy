import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { game, gpu, cpu, ram } = await req.json();
    console.log('Analyzing specs for:', { game, gpu, cpu, ram });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // First, use AI to fetch game requirements
    const gameRequirementsPrompt = `You are a gaming hardware expert. Provide the minimum and recommended system requirements for the game "${game}". 
    
    Return ONLY a JSON object with this exact structure (no markdown, no code blocks, just pure JSON):
    {
      "minimum": {
        "gpu": "GPU model",
        "cpu": "CPU model",
        "ram": "RAM amount"
      },
      "recommended": {
        "gpu": "GPU model",
        "cpu": "CPU model",
        "ram": "RAM amount"
      }
    }
    
    If the game doesn't exist or you're not sure, use reasonable estimates for a modern AAA game.`;

    const gameReqResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: gameRequirementsPrompt }],
      }),
    });

    if (!gameReqResponse.ok) {
      console.error("AI gateway error for game requirements:", gameReqResponse.status);
      throw new Error("Failed to fetch game requirements");
    }

    const gameReqData = await gameReqResponse.json();
    const gameReqText = gameReqData.choices?.[0]?.message?.content || "";
    console.log("Game requirements response:", gameReqText);
    
    // Parse JSON from the response, removing markdown code blocks if present
    let gameRequirements;
    try {
      const jsonMatch = gameReqText.match(/\{[\s\S]*\}/);
      gameRequirements = JSON.parse(jsonMatch ? jsonMatch[0] : gameReqText);
    } catch (e) {
      console.error("Failed to parse game requirements:", e);
      throw new Error("Invalid game requirements format");
    }

    // Now analyze the user's specs against the requirements
    const analysisPrompt = `You are a gaming hardware expert. Compare the user's PC specs with the game requirements and provide a detailed analysis.

User's PC Specs:
- GPU: ${gpu}
- CPU: ${cpu}
- RAM: ${ram}

Game: ${game}
Minimum Requirements:
- GPU: ${gameRequirements.minimum.gpu}
- CPU: ${gameRequirements.minimum.cpu}
- RAM: ${gameRequirements.minimum.ram}

Recommended Requirements:
- GPU: ${gameRequirements.recommended.gpu}
- CPU: ${gameRequirements.recommended.cpu}
- RAM: ${gameRequirements.recommended.ram}

Return ONLY a JSON object with this exact structure (no markdown, no code blocks):
{
  "canRun": boolean (can the game run at all),
  "minimumMet": boolean (meets minimum requirements),
  "recommendedMet": boolean (meets recommended requirements),
  "fpsEstimates": {
    "low720p": number (FPS at low settings 720p),
    "medium1080p": number (FPS at medium settings 1080p),
    "high1080p": number (FPS at high settings 1080p),
    "ultra1440p": number (FPS at ultra settings 1440p)
  },
  "recommendations": {
    "resolution": "recommended resolution (e.g., 1080p, 1440p)",
    "settings": "recommended graphics settings (e.g., Low, Medium, High, Ultra)",
    "expectedFps": number (expected FPS with these settings),
    "reasoning": "brief explanation of why these settings are optimal"
  }
}

Be realistic with FPS estimates based on actual hardware capabilities.`;

    const analysisResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: analysisPrompt }],
      }),
    });

    if (!analysisResponse.ok) {
      console.error("AI gateway error for analysis:", analysisResponse.status);
      throw new Error("Failed to analyze specs");
    }

    const analysisData = await analysisResponse.json();
    const analysisText = analysisData.choices?.[0]?.message?.content || "";
    console.log("Analysis response:", analysisText);

    // Parse JSON from the response
    let analysis;
    try {
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      analysis = JSON.parse(jsonMatch ? jsonMatch[0] : analysisText);
    } catch (e) {
      console.error("Failed to parse analysis:", e);
      throw new Error("Invalid analysis format");
    }

    // Combine results
    const result = {
      ...analysis,
      gameRequirements,
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in analyze-game-specs:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
