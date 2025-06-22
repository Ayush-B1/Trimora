// src/components/AlertBanner.jsx

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const AlertBanner = ({ tool }) => {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Alert: {tool.name}</AlertTitle>
      <AlertDescription>
      <p>Usage: {tool.usage}</p>
      <p>Renewal Date: {tool.renewalDate}</p>
      </AlertDescription>
    </Alert>
  );
};

export default AlertBanner;
