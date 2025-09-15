import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Download, 
  Play, 
  Pause, 
  RotateCcw,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BatchResult {
  url: string;
  status: "pending" | "analyzing" | "completed" | "error";
  riskScore?: number;
  classification?: "safe" | "suspicious" | "dangerous";
  processingTime?: number;
}

const BatchAnalyzer = () => {
  const [urls, setUrls] = useState("");
  const [results, setResults] = useState<BatchResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sampleUrls = `https://example.com/login
https://suspicious-site.net/verify-account
https://legitimate-bank.com/secure
https://bit.ly/fake-link
https://phishing-example.org/update-info`;

  const parseUrls = (text: string): string[] => {
    return text
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0 && url.includes('.'));
  };

  const simulateAnalysis = async (url: string): Promise<BatchResult> => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const suspiciousPatterns = ["bit.ly", "suspicious", "phishing", "fake", "verify"];
    const suspiciousCount = suspiciousPatterns.filter(pattern => 
      url.toLowerCase().includes(pattern)
    ).length;
    
    const riskScore = Math.min(100, Math.max(0, 
      Math.random() * 30 + suspiciousCount * 20
    ));
    
    const classification: "safe" | "suspicious" | "dangerous" = 
      riskScore < 30 ? "safe" : riskScore < 70 ? "suspicious" : "dangerous";

    return {
      url,
      status: "completed",
      riskScore: Math.round(riskScore),
      classification,
      processingTime: Math.round((1000 + Math.random() * 2000) / 1000 * 100) / 100
    };
  };

  const startAnalysis = async () => {
    const urlList = parseUrls(urls);
    if (urlList.length === 0) return;

    setIsProcessing(true);
    setIsPaused(false);
    setProgress(0);

    // Initialize results
    const initialResults: BatchResult[] = urlList.map(url => ({
      url,
      status: "pending"
    }));
    setResults(initialResults);

    // Process URLs one by one
    for (let i = 0; i < urlList.length; i++) {
      if (isPaused) {
        break;
      }

      // Update status to analyzing
      setResults(prev => prev.map((result, index) => 
        index === i ? { ...result, status: "analyzing" } : result
      ));

      try {
        const result = await simulateAnalysis(urlList[i]);
        setResults(prev => prev.map((r, index) => 
          index === i ? result : r
        ));
      } catch (error) {
        setResults(prev => prev.map((result, index) => 
          index === i ? { ...result, status: "error" } : result
        ));
      }

      setProgress(((i + 1) / urlList.length) * 100);
    }

    setIsProcessing(false);
  };

  const pauseAnalysis = () => {
    setIsPaused(true);
    setIsProcessing(false);
  };

  const resetAnalysis = () => {
    setResults([]);
    setProgress(0);
    setIsProcessing(false);
    setIsPaused(false);
  };

  const exportResults = () => {
    const csvContent = [
      "URL,Risk Score,Classification,Processing Time (s)",
      ...results
        .filter(r => r.status === "completed")
        .map(r => `"${r.url}",${r.riskScore},${r.classification},${r.processingTime}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `phishing_analysis_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-muted-foreground" />;
      case "analyzing": return <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      case "completed": return <CheckCircle className="h-4 w-4 text-success" />;
      case "error": return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  const getRiskColor = (classification?: string) => {
    switch (classification) {
      case "safe": return "text-success";
      case "suspicious": return "text-warning";
      case "dangerous": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const completedCount = results.filter(r => r.status === "completed").length;
  const errorCount = results.filter(r => r.status === "error").length;

  return (
    <div className="space-y-6">
      {/* Batch Input */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Batch URL Analysis
          </CardTitle>
          <CardDescription>
            Analyze multiple URLs simultaneously for phishing threats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">URLs (one per line)</label>
            <Textarea
              placeholder="Enter URLs, one per line..."
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              disabled={isProcessing}
              className="min-h-[120px] bg-input/50 border-border/50"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setUrls(sampleUrls)}
              variant="outline"
              size="sm"
              disabled={isProcessing}
            >
              <FileText className="h-4 w-4 mr-2" />
              Load Sample URLs
            </Button>
            <Button
              onClick={() => setUrls("")}
              variant="outline"
              size="sm"
              disabled={isProcessing}
            >
              Clear
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {!isProcessing && results.length === 0 && (
              <Button 
                onClick={startAnalysis}
                disabled={parseUrls(urls).length === 0}
                className="bg-gradient-primary hover:shadow-glow"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Analysis ({parseUrls(urls).length} URLs)
              </Button>
            )}
            
            {isProcessing && (
              <Button onClick={pauseAnalysis} variant="outline">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            
            {results.length > 0 && (
              <>
                <Button onClick={resetAnalysis} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                {completedCount > 0 && (
                  <Button onClick={exportResults} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Results
                  </Button>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      {results.length > 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Analysis Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-lg">{results.length}</div>
                <div className="text-muted-foreground">Total</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-success">{completedCount}</div>
                <div className="text-muted-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-primary">
                  {results.filter(r => r.status === "analyzing").length}
                </div>
                <div className="text-muted-foreground">Processing</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-destructive">{errorCount}</div>
                <div className="text-muted-foreground">Errors</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              Detailed results for each analyzed URL
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {results.map((result, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {getStatusIcon(result.status)}
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm truncate" title={result.url}>
                        {result.url}
                      </div>
                      {result.processingTime && (
                        <div className="text-xs text-muted-foreground">
                          Processed in {result.processingTime}s
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {result.riskScore !== undefined && (
                      <div className="text-right">
                        <div className={cn("font-bold text-sm", getRiskColor(result.classification))}>
                          {result.riskScore}/100
                        </div>
                      </div>
                    )}
                    {result.classification && (
                      <Badge 
                        variant="outline" 
                        className={cn(
                          getRiskColor(result.classification),
                          result.classification === "dangerous" && "border-destructive/50",
                          result.classification === "suspicious" && "border-warning/50",
                          result.classification === "safe" && "border-success/50"
                        )}
                      >
                        {result.classification}
                      </Badge>
                    )}
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

export default BatchAnalyzer;