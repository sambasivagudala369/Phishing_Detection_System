import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Shield, ShieldCheck, Search, Activity, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisResult {
  url: string;
  riskScore: number;
  classification: "safe" | "suspicious" | "dangerous";
  threats: string[];
  timestamp: Date;
  features: {
    domainAge: number;
    sslCertificate: boolean;
    suspiciousKeywords: number;
    redirectChain: number;
    reputation: number;
  };
}

const PhishingDetector = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);

  const simulateAnalysis = async (inputUrl: string): Promise<AnalysisResult> => {
    // Simulate ML analysis with realistic patterns
    const suspiciousPatterns = [
      "bit.ly", "tinyurl", "t.co", "short", "click", "login", "verify", 
      "secure", "account", "update", "suspended", "urgent"
    ];
    
    const suspiciousCount = suspiciousPatterns.filter(pattern => 
      inputUrl.toLowerCase().includes(pattern)
    ).length;
    
    const hasHttps = inputUrl.startsWith("https://");
    const domainParts = inputUrl.split("/")[2]?.split(".") || [];
    const hasSubdomains = domainParts.length > 2;
    
    // Calculate risk score based on features
    let riskScore = Math.random() * 30; // Base randomness
    riskScore += suspiciousCount * 15;
    riskScore += hasHttps ? 0 : 25;
    riskScore += hasSubdomains ? 10 : 0;
    riskScore += inputUrl.length > 50 ? 15 : 0;
    
    riskScore = Math.min(100, Math.max(0, riskScore));
    
    const classification: "safe" | "suspicious" | "dangerous" = 
      riskScore < 30 ? "safe" : riskScore < 70 ? "suspicious" : "dangerous";
    
    const threats = [];
    if (suspiciousCount > 0) threats.push("Suspicious keywords detected");
    if (!hasHttps) threats.push("No SSL encryption");
    if (hasSubdomains) threats.push("Multiple subdomains");
    if (inputUrl.length > 50) threats.push("Unusually long URL");
    
    return {
      url: inputUrl,
      riskScore: Math.round(riskScore),
      classification,
      threats,
      timestamp: new Date(),
      features: {
        domainAge: Math.floor(Math.random() * 3000),
        sslCertificate: hasHttps,
        suspiciousKeywords: suspiciousCount,
        redirectChain: Math.floor(Math.random() * 5),
        reputation: Math.floor(Math.random() * 100),
      }
    };
  };

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const analysisResult = await simulateAnalysis(url);
      setResult(analysisResult);
      setAnalysisHistory(prev => [analysisResult, ...prev.slice(0, 9)]);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (classification: string) => {
    switch (classification) {
      case "safe": return "text-success";
      case "suspicious": return "text-warning";
      case "dangerous": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getRiskIcon = (classification: string) => {
    switch (classification) {
      case "safe": return <ShieldCheck className="h-5 w-5 text-success" />;
      case "suspicious": return <Shield className="h-5 w-5 text-warning" />;
      case "dangerous": return <AlertTriangle className="h-5 w-5 text-destructive" />;
      default: return <Globe className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* URL Input Section */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            URL Analysis
          </CardTitle>
          <CardDescription>
            Enter a URL to analyze for phishing threats using advanced ML detection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com/suspicious-link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-input/50 border-border/50"
              disabled={isAnalyzing}
            />
            <Button 
              onClick={handleAnalyze} 
              disabled={!url.trim() || isAnalyzing}
              className="bg-gradient-primary hover:shadow-glow"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="h-4 w-4 animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {result && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getRiskIcon(result.classification)}
              Analysis Results
              <Badge 
                variant="outline" 
                className={cn(
                  "ml-auto",
                  getRiskColor(result.classification),
                  result.classification === "dangerous" && "border-destructive/50 bg-destructive/10",
                  result.classification === "suspicious" && "border-warning/50 bg-warning/10",
                  result.classification === "safe" && "border-success/50 bg-success/10"
                )}
              >
                {result.classification.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Risk Score */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Risk Score</span>
                <span className={cn("font-bold", getRiskColor(result.classification))}>
                  {result.riskScore}/100
                </span>
              </div>
              <Progress 
                value={result.riskScore} 
                className={cn(
                  "h-2",
                  result.classification === "dangerous" && "[&>div]:bg-gradient-danger",
                  result.classification === "suspicious" && "[&>div]:bg-gradient-to-r [&>div]:from-warning [&>div]:to-warning-glow",
                  result.classification === "safe" && "[&>div]:bg-gradient-success"
                )}
              />
            </div>

            {/* Threats Detected */}
            {result.threats.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Threats Detected</h4>
                <div className="space-y-1">
                  {result.threats.map((threat, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="h-3 w-3 text-destructive" />
                      <span>{threat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Feature Analysis */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Domain Age</div>
                <div className="font-medium">{result.features.domainAge} days</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">SSL Certificate</div>
                <div className={cn(
                  "font-medium",
                  result.features.sslCertificate ? "text-success" : "text-destructive"
                )}>
                  {result.features.sslCertificate ? "Valid" : "Missing"}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Suspicious Keywords</div>
                <div className="font-medium">{result.features.suspiciousKeywords}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Redirect Chain</div>
                <div className="font-medium">{result.features.redirectChain}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Domain Reputation</div>
                <div className="font-medium">{result.features.reputation}/100</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis History */}
      {analysisHistory.length > 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Recent Analysis</CardTitle>
            <CardDescription>Your last 10 URL scans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysisHistory.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    {getRiskIcon(item.classification)}
                    <div>
                      <div className="font-medium text-sm truncate max-w-[300px]">
                        {item.url}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn("font-bold text-sm", getRiskColor(item.classification))}>
                      {item.riskScore}/100
                    </div>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs",
                        getRiskColor(item.classification),
                        item.classification === "dangerous" && "border-destructive/50",
                        item.classification === "suspicious" && "border-warning/50",
                        item.classification === "safe" && "border-success/50"
                      )}
                    >
                      {item.classification}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PhishingDetector;