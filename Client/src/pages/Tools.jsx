// src/pages/Tools.jsx
import ToolForm from '../components/ToolForm';
import { useTools } from '../context/ToolContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const Tools = () => {
  const { tools, removeTool } = useTools();

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

  return (
    <div className="space-y-6 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">🧰 Tools Management</h2>
      
      <ToolForm />

      <Card>
        <CardHeader>
          <CardTitle>Your Tool Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool Name</TableHead>
                <TableHead>Monthly Cost</TableHead>
                <TableHead>Annual Cost</TableHead>
                <TableHead>Renewal Date</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tools.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="6" className="text-center">
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
                    <TableCell>
                      <Badge variant={getUsageBadgeVariant(tool.usage)}>
                        {tool.usage}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm" onClick={() => removeTool(tool.id)}>Remove</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tools;
