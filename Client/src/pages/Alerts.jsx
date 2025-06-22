// src/pages/Alerts.jsx

import { AlertCircle, Trash2, Info, BellRing } from "lucide-react";
import { useTools } from "../context/ToolContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "../lib/formatDate";

const alertConfig = {
    error: {
        icon: AlertCircle,
        title: "Budget Alert",
        variant: "destructive",
    },
    warning: {
        icon: BellRing,
        title: "Renewal Reminder",
        variant: "default",
        colorClass: "border-yellow-500/50 text-yellow-500 dark:border-yellow-500 [&>svg]:text-yellow-500"
    },
    info: {
        icon: Info,
        title: "Optimization Suggestion",
        variant: "default",
        colorClass: "border-blue-500/50 text-blue-500 dark:border-blue-500 [&>svg]:text-blue-500"
    }
}

const Alerts = () => {
  const { alerts, dismissAlert } = useTools();

  return (
    <div className="space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">🚨 Actionable Alerts</h2>
      </div>

      {alerts.length === 0 ? (
        <Card>
           <CardContent className="pt-6">
            <p>No alerts to show. Everything looks good!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => {
            const config = alertConfig[alert.type] || alertConfig.info;
            return (
              <Alert key={alert.id} variant={config.variant} className={config.colorClass}>
                <config.icon className="h-4 w-4" />
                <AlertTitle>{config.title} - <span className="font-normal text-xs">{formatDate(alert.date)}</span></AlertTitle>
                <AlertDescription>
                  <div className="flex justify-between items-center">
                    {alert.message}
                    <Button variant="ghost" size="sm" onClick={() => dismissAlert(alert.id)}>
                        <Trash2 className="h-4 w-4"/>
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default Alerts;
