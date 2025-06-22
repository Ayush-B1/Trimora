// src/pages/Insights.jsx

import { useTools } from '../context/ToolContext';
import { calculateInsights } from '../lib/usageHelper';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Insights = () => {
  const { tools } = useTools();
  const { totalMonthly, totalAnnual, unusedPercent, topExpensive } = calculateInsights(tools);

  const insights = [
    { title: "Total Monthly Spend", value: `₹${totalMonthly}` },
    { title: "Total Annual Spend", value: `₹${totalAnnual}` },
    { title: "Unused Tools", value: `${unusedPercent}%` },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">📈 SaaS Spend Insights</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight) => (
            <Card key={insight.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{insight.value}</div>
                </CardContent>
            </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🏆 Top 3 Expensive Tools</CardTitle>
        </CardHeader>
        <CardContent>
      <ul>
        {topExpensive.map((tool) => (
                <li key={tool.id} className="flex justify-between">
                    <span>{tool.name}</span>
                    <span>₹{tool.cost}</span>
          </li>
        ))}
      </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Insights;
