import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Activity, Globe, Layers, Zap } from "lucide-react";
import PhishingDetector from "@/components/PhishingDetector";
import SecurityDashboard from "@/components/SecurityDashboard";
import ThreatIntelligence from "@/components/ThreatIntelligence";
import BatchAnalyzer from "@/components/BatchAnalyzer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
                  PhishGuard AI
                </h1>
                <p className="text-sm text-muted-foreground">
                  Advanced ML-Powered Phishing Detection System
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-success border-success/50">
                <Activity className="h-3 w-3 mr-1" />
                System Online
              </Badge>
              <Badge variant="outline" className="text-primary border-primary/50">
                <Zap className="h-3 w-3 mr-1" />
                AI Enabled
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="detector" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="detector" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">URL Detector</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Threat Intel</span>
            </TabsTrigger>
            <TabsTrigger value="batch" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span className="hidden sm:inline">Batch Analysis</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="detector">
            <div className="space-y-6">
              <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-center">Real-Time URL Analysis</CardTitle>
                  <CardDescription className="text-center">
                    Advanced machine learning algorithms analyze URLs for phishing indicators,
                    suspicious patterns, and malicious content in real-time.
                  </CardDescription>
                </CardHeader>
              </Card>
              <PhishingDetector />
            </div>
          </TabsContent>

          <TabsContent value="dashboard">
            <SecurityDashboard />
          </TabsContent>

          <TabsContent value="intelligence">
            <ThreatIntelligence />
          </TabsContent>

          <TabsContent value="batch">
            <BatchAnalyzer />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              © 2024 PhishGuard AI. Advanced cybersecurity protection powered by machine learning.
            </div>
            <div className="flex items-center gap-4">
              <span>Built with React, TypeScript & scikit-learn</span>
              <Badge variant="outline" className="text-xs">
                v2.1.0
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
