import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Download,
  Filter,
  Wifi
} from "lucide-react";

const ThreatIntelligence = () => {
  const globalThreats = [
    {
      id: 1,
      type: "Phishing Campaign",
      severity: "high",
      origin: "Eastern Europe",
      targets: "Financial institutions",
      firstSeen: "2 hours ago",
      affectedDomains: 1247,
      description: "Large-scale phishing operation targeting online banking credentials"
    },
    {
      id: 2,
      type: "Malware Distribution",
      severity: "critical",
      origin: "Southeast Asia",
      targets: "E-commerce platforms",
      firstSeen: "6 hours ago",
      affectedDomains: 892,
      description: "New variant of banking trojan spreading through compromised websites"
    },
    {
      id: 3,
      type: "Brand Impersonation",
      severity: "medium",
      origin: "North America",
      targets: "Social media users",
      firstSeen: "1 day ago",
      affectedDomains: 456,
      description: "Fake social media login pages mimicking major platforms"
    }
  ];

  const threatSources = [
    { name: "VirusTotal", status: "connected", lastSync: "5 min ago" },
    { name: "PhishTank", status: "connected", lastSync: "12 min ago" },
    { name: "URLVoid", status: "connected", lastSync: "3 min ago" },
    { name: "Hybrid Analysis", status: "disconnected", lastSync: "2 hours ago" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-destructive border-destructive/50 bg-destructive/10";
      case "high": return "text-destructive border-destructive/30 bg-destructive/5";
      case "medium": return "text-warning border-warning/50 bg-warning/10";
      case "low": return "text-success border-success/50 bg-success/10";
      default: return "text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6">
      {/* Threat Intelligence Header */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Global Threat Intelligence
              </CardTitle>
              <CardDescription>
                Real-time threat data from multiple security sources
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Threats</TabsTrigger>
          <TabsTrigger value="sources">Intelligence Sources</TabsTrigger>
          <TabsTrigger value="trends">Threat Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {/* Active Threats */}
          <div className="grid gap-4">
            {globalThreats.map((threat) => (
              <Card key={threat.id} className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{threat.type}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {threat.origin}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {threat.firstSeen}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={getSeverityColor(threat.severity)}
                    >
                      {threat.severity.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {threat.description}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Primary Targets</div>
                      <div className="font-medium">{threat.targets}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Affected Domains</div>
                      <div className="font-medium text-destructive">{threat.affectedDomains.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Threat Level</div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-destructive" />
                        <span className="font-medium">Active</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          {/* Intelligence Sources */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Connected Sources</CardTitle>
              <CardDescription>
                External threat intelligence feeds and their sync status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        source.status === 'connected' ? 'bg-success' : 'bg-destructive'
                      }`} />
                      <div>
                        <div className="font-medium">{source.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Last sync: {source.lastSync}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline"
                        className={
                          source.status === 'connected' 
                            ? 'text-success border-success/50' 
                            : 'text-destructive border-destructive/50'
                        }
                      >
                        <Wifi className="h-3 w-3 mr-1" />
                        {source.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          {/* Threat Trends */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Rising Threats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { type: "AI-Generated Phishing", increase: "+340%", timeframe: "Last 30 days" },
                  { type: "Mobile Banking Trojans", increase: "+125%", timeframe: "Last 14 days" },
                  { type: "Cryptocurrency Scams", increase: "+89%", timeframe: "Last 7 days" },
                ].map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <div className="font-medium text-sm">{trend.type}</div>
                      <div className="text-xs text-muted-foreground">{trend.timeframe}</div>
                    </div>
                    <Badge variant="outline" className="text-destructive border-destructive/50">
                      {trend.increase}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { region: "North America", percentage: 34, threats: 2847 },
                  { region: "Europe", percentage: 28, threats: 2341 },
                  { region: "Asia Pacific", percentage: 23, threats: 1923 },
                  { region: "South America", percentage: 15, threats: 1256 },
                ].map((region, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{region.region}</span>
                      <span className="font-medium">{region.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary transition-all duration-500"
                        style={{ width: `${region.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {region.threats.toLocaleString()} threats detected
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThreatIntelligence;