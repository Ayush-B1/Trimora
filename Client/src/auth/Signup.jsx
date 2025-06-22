import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Briefcase } from "lucide-react";

function Signup() {
  const [companySize, setCompanySize] = useState("");
  const [industry, setIndustry] = useState("");
  const [role, setRole] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 p-4">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl border-0">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="bg-primary/10 rounded-full p-3 mb-2">
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-center">Welcome</CardTitle>
          <CardDescription className="text-center text-base">
            Create your business account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" type="text" placeholder="Acme Corp" required />
            </div>
            <div className="space-y-3">
              <Label htmlFor="companySize">Company Size</Label>
              <Select onValueChange={setCompanySize} value={companySize} required>
                <SelectTrigger id="companySize">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10</SelectItem>
                  <SelectItem value="11-50">11-50</SelectItem>
                  <SelectItem value="51-200">51-200</SelectItem>
                  <SelectItem value="201-500">201-500</SelectItem>
                  <SelectItem value="500+">500+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" type="text" placeholder="e.g., SaaS, Finance, Healthcare" required />
            </div>
            <div className="space-y-3">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="space-y-3">
              <Label htmlFor="role">Role/Title</Label>
              <Input id="role" type="text" placeholder="e.g., CTO, Procurement Manager" required />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email">Work Email</Label>
              <Input id="email" type="email" placeholder="you@company.com" required />
            </div>
            <div className="space-y-3 md:col-span-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="md:col-span-2">
              <Button className="w-full h-12 text-base font-semibold" type="submit">
                Create Business Account
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="mt-2 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
export default Signup;