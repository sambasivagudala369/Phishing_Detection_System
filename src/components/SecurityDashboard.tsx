import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  Globe,
  Lock,
  Zap,
  Eye
} from "lucide-react";

const SecurityDashboard = () => {
  // Mock security metrics
  const securityMetrics = {
    totalScans: 2847,
    threatsBlocked: 156,
    successRate: 94.5,
    avgResponseTime: 1.2,
  };

  const recentThreats = [
    { type: "Phishing", count: 45, trend: "+12%" },
    { type: "Malware", count: 23, trend: "-8%" },
    { type: "Suspicious Redirects", count: 67, trend: "+25%" },
    { type: "SSL Issues", count: 21, trend: "-5%" },
  ];

  const systemStatus = [
    { component: "ML Engine", status: "operational", uptime: "99.9%" },
    { component: "Threat Database", status: "operational", uptime: "100%" },
    { component: "API Gateway", status: "degraded", uptime: "97.2%" },
    { component: "Real-time Scanner", status: "operational", uptime: "99.5%" },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityMetrics.totalScans.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
            <Shield className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{securityMetrics.threatsBlocked}</div>
            <p className="text-xs text-muted-foreground">-2.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{securityMetrics.successRate}%</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Zap className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityMetrics.avgResponseTime}s</div>
            <p className="text-xs text-muted-foreground">-0.3s from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Analysis */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Threat Categories
            </CardTitle>
            <CardDescription>
              Distribution of detected threats over the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentThreats.map((threat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{threat.type}</span>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={threat.trend.startsWith('+') ? 'text-destructive border-destructive/50' : 'text-success border-success/50'}
                    >
                      {threat.trend}
                    </Badge>
                    <span className="font-bold">{threat.count}</span>
                  </div>
                </div>
                <Progress 
                  value={(threat.count / 100) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              System Status
            </CardTitle>
            <CardDescription>
              Real-time monitoring of security components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemStatus.map((system, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    system.status === 'operational' ? 'bg-success' : 'bg-warning'
                  }`} />
                  <div>
                    <div className="font-medium text-sm">{system.component}</div>
                    <div className="text-xs text-muted-foreground">
                      Uptime: {system.uptime}
                    </div>
                  </div>
                </div>
                <Badge 
                  variant="outline"
                  className={
                    system.status === 'operational' 
                      ? 'text-success border-success/50' 
                      : 'text-warning border-warning/50'
                  }
                >
                  {system.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ML Model Performance */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            ML Model Performance
          </CardTitle>
          <CardDescription>
            Advanced machine learning model metrics and accuracy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Accuracy</span>
                <span className="font-bold text-success">96.8%</span>
              </div>
              <Progress value={96.8} className="h-2 [&>div]:bg-gradient-success" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Precision</span>
                <span className="font-bold text-primary">94.2%</span>
              </div>
              <Progress value={94.2} className="h-2 [&>div]:bg-gradient-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Recall</span>
                <span className="font-bold text-warning">91.5%</span>
              </div>
              <Progress value={91.5} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-warning [&>div]:to-warning-glow" />
            </div>
          </div>
          <div className="mt-6 p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Model Information</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <div className="text-muted-foreground">Algorithm</div>
                <div className="font-medium">Random Forest + SVM</div>
              </div>
              <div>
                <div className="text-muted-foreground">Features</div>
                <div className="font-medium">47 extracted</div>
              </div>
              <div>
                <div className="text-muted-foreground">Training Data</div>
                <div className="font-medium">250K samples</div>
              </div>
              <div>
                <div className="text-muted-foreground">Last Updated</div>
                <div className="font-medium">2 hours ago</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityDashboard;