import { useState, useEffect } from 'react';
import { useTools } from '../context/ToolContext';
import predefinedTools from '../data/predefinedTools';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const ToolForm = () => {
  const { addTool, tools } = useTools();

  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [annualCost, setAnnualCost] = useState('');
  const [renewalDate, setRenewalDate] = useState('');
  const [usage, setUsage] = useState('frequent');
  const [category, setCategory] = useState('');
  const [selected, setSelected] = useState('');
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (selected) {
        const selectedTool = predefinedTools.find(t => t.name === selected);
        if (selectedTool) {
          setName(selectedTool.name);
          handleMonthlyCostChange({ target: { value: selectedTool.cost.toString() } });
          setCategory(selectedTool.category);
          setIsManual(false);
        }
    } else {
        setIsManual(true);
        setName('');
        setCost('');
        setAnnualCost('');
        setCategory('');
    }
  }, [selected]);

  const handleSelectTool = (value) => {
    setSelected(value);
  };

  const handleMonthlyCostChange = (e) => {
    const monthly = e.target.value;
    setCost(monthly);
    if (monthly && !isNaN(parseFloat(monthly))) {
      setAnnualCost((parseFloat(monthly) * 12).toFixed(2));
    } else {
      setAnnualCost('');
    }
  };

  const handleAnnualCostChange = (e) => {
    const yearly = e.target.value;
    setAnnualCost(yearly);
    if (yearly && !isNaN(parseFloat(yearly))) {
      setCost((parseFloat(yearly) / 12).toFixed(2));
    } else {
      setCost('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !cost || !renewalDate || !category) {
      return alert("Please complete all fields.");
    }
    if (tools.some(tool => tool.name.trim().toLowerCase() === name.trim().toLowerCase())) {
      return alert(`You have already added a tool named '${name}'. Remove it first to add again.`);
    }
    const newTool = {
      id: Date.now(),
      name,
      cost: parseFloat(cost),
      renewalDate,
      usage,
      category,
    };
    addTool(newTool);
    alert(`✅ ${name} added to your tool list.`);
    setName('');
    setCost('');
    setAnnualCost('');
    setRenewalDate('');
    setUsage('frequent');
    setCategory('');
    setSelected('');
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 items-end p-4 border rounded-lg bg-card text-card-foreground">
        <div className="grid w-full items-center gap-1.5">
            <Label>Predefined Tool</Label>
            <Select onValueChange={handleSelectTool} value={selected}>
              <SelectTrigger>
                <SelectValue placeholder="Select tool" />
              </SelectTrigger>
              <SelectContent>
                {predefinedTools.map(tool => (
                  <SelectItem key={tool.name} value={tool.name}>{tool.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Tool Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Slack"
              disabled={!isManual && !!selected}
              required
            />
        </div>
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Communication"
              disabled={!isManual && !!selected}
              required
            />
        </div>
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="cost">Monthly Cost (₹)</Label>
            <Input
              id="cost"
              type="number"
              value={cost}
              onChange={handleMonthlyCostChange}
              placeholder="e.g., 299"
              required
            />
        </div>
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="annualCost">Annual Cost (₹)</Label>
            <Input
              id="annualCost"
              type="number"
              value={annualCost}
              onChange={handleAnnualCostChange}
              placeholder="e.g., 3588"
              required
            />
        </div>
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="renewalDate">Renewal Date</Label>
            <Input
              id="renewalDate"
              type="date"
              value={renewalDate}
              onChange={(e) => setRenewalDate(e.target.value)}
              required
            />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label>Usage Frequency</Label>
          <Select onValueChange={setUsage} value={usage}>
              <SelectTrigger>
                  <SelectValue placeholder="Select usage" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="frequent">Frequent</SelectItem>
                  <SelectItem value="infrequent">Infrequent</SelectItem>
                  <SelectItem value="unused">Unused</SelectItem>
              </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">➕ Add Tool</Button>
    </form>
  );
};

export default ToolForm;
