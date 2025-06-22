import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import { useTools } from '../context/ToolContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { tools, annualBudget, updateAnnualBudget } = useTools();
  const { currentUser } = useContext(AuthContext);
  const [newBudget, setNewBudget] = useState(annualBudget);

  const currentMonth = new Date().getMonth(); // 0 = Jan

  const totalMonthly = tools.reduce((sum, tool) => sum + tool.cost, 0);
  const totalToolSpendAnnual = totalMonthly * 12;
  const totalSubscriptions = tools.length;
  const ytdSpend = totalMonthly * (currentMonth + 1);
  const projectedAnnualSpend = tools.reduce((sum, tool) => sum + (tool.cost * 12), 0);
  const budgetUtilization = annualBudget > 0 ? (ytdSpend / annualBudget) * 100 : 0;

  const kpis = [
    { title: "Annual Budget", value: `₹${annualBudget.toLocaleString()}`, icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
    { title: "Projected Annual Spend", value: `₹${projectedAnnualSpend.toLocaleString()}`, icon: <Activity className="h-4 w-4 text-muted-foreground" /> },
    { title: "Total Subscriptions", value: totalSubscriptions, icon: <Users className="h-4 w-4 text-muted-foreground" /> },
    { title: "YTD Spend", value: `₹${ytdSpend.toLocaleString()}`, icon: <CreditCard className="h-4 w-4 text-muted-foreground" /> },
  ];

  const chartData = tools.map(tool => ({
    name: tool.name,
    cost: tool.cost,
  }));

  const chartConfig = {
    cost: {
      label: "Cost",
      color: "hsl(var(--chart-1))",
    },
  };

  const pieChartData = tools.map(tool => ({
    name: tool.name,
    value: tool.cost
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF1919"];

  const getUsageBadgeVariant = (usage) => {
    switch (usage) {
      case "frequent":
        return "default";
      case "infrequent":
        return "secondary";
      case "unused":
        return "destructive";
      default:
        return "outline";
    }
  };

  const handleBudgetUpdate = () => {
    updateAnnualBudget(parseFloat(newBudget));
    alert('Budget updated!');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {currentUser?.displayName || 'User'}!</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Set Your Annual Budget</CardTitle>
          <CardDescription>
            Define your total annual budget for SaaS tools to track your spending against it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="number"
              placeholder="e.g., 120000"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
            />
            <Button onClick={handleBudgetUpdate}>Update Budget</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
            <Card key={kpi.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    {kpi.icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                </CardContent>
            </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Monthly Tool Cost Analysis</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="cost" fill="var(--color-cost)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
           <CardHeader>
            <CardTitle>Spend Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="min-h-[350px] w-full">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`}/>
                <Legend />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <Card>
            <CardHeader>
              <CardTitle>Budget Utilization</CardTitle>
               <CardDescription>
               A summary of your production costs and business-related spend.
             </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
             <div>
               <div className="flex items-center justify-between mb-2">
                 <span className="text-sm text-muted-foreground">YTD Spend</span>
                 <span className="text-lg font-bold">₹{ytdSpend.toLocaleString()}</span>
               </div>
               <Progress value={budgetUtilization} className="w-full" />
               <div className="flex items-center justify-between mt-2">
                 <span className="text-sm text-muted-foreground">
                   {`Budget: ₹${annualBudget.toLocaleString()}`}
                 </span>
                 <span className="text-sm">
                   {budgetUtilization.toFixed(0)}%
                 </span>
               </div>
             </div>
             <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                 <span className="text-sm text-muted-foreground">Projected Annual Spend</span>
                 <span className="text-lg font-bold">₹{projectedAnnualSpend.toLocaleString()}</span>
               </div>
                <p className="text-xs text-muted-foreground mt-1">
                 Based on current monthly subscriptions, this is the projected spend for the year.
               </p>
              </div>
            </CardContent>
          </Card>
          <Card>
          <CardHeader>
            <CardTitle>📋 Subscribed Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tool Name</TableHead>
                  <TableHead>Monthly Cost</TableHead>
                  <TableHead>Annual Cost</TableHead>
                  <TableHead>Renewal Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Usage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tools.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No tools added yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  tools.map((tool) => (
                    <TableRow key={tool.id}>
                      <TableCell>{tool.name}</TableCell>
                      <TableCell>₹{tool.cost.toLocaleString()}</TableCell>
                      <TableCell>₹{(tool.cost * 12).toLocaleString()}</TableCell>
                      <TableCell>{tool.renewalDate}</TableCell>
                      <TableCell>{tool.category}</TableCell>
                      <TableCell>
                        <Badge variant={getUsageBadgeVariant(tool.usage)}>
                          {tool.usage}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
