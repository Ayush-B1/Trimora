// src/context/ToolContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { daysUntilRenewal } from '../lib/formatDate';

const ToolContext = createContext();

export const ToolProvider = ({ children }) => {
  const [tools, setTools] = useState([]);
  const [annualBudget, setAnnualBudget] = useState(100000); // Default budget
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const generateAlerts = () => {
      let newAlerts = [];

      // 1. Budget Exceeded Alert
      const projectedAnnualSpend = tools.reduce((sum, tool) => sum + (tool.cost * 12), 0);
      if (projectedAnnualSpend > annualBudget) {
        newAlerts.push({
          id: 'budget_exceeded',
          type: 'error',
          message: `Projected annual spend (₹${projectedAnnualSpend.toLocaleString()}) exceeds your budget (₹${annualBudget.toLocaleString()}).`,
          date: new Date().toISOString(),
        });
      }

      // 2. Renewal Alerts
      tools.forEach(tool => {
        const daysLeft = daysUntilRenewal(tool.renewalDate);
        if (daysLeft <= 30 && daysLeft >= 0) {
          newAlerts.push({
            id: `renewal_${tool.id}`,
            type: 'warning',
            message: `${tool.name} is due for renewal in ${daysLeft} days.`,
            date: new Date().toISOString(),
          });
        }
      });

      // 3. Tool Overlap Alerts
      const toolsByCategory = tools.reduce((acc, tool) => {
        acc[tool.category] = acc[tool.category] || [];
        acc[tool.category].push(tool.name);
        return acc;
      }, {});

      Object.entries(toolsByCategory).forEach(([category, toolNames]) => {
        if (toolNames.length > 1) {
          newAlerts.push({
            id: `overlap_${category}`,
            type: 'info',
            message: `You have multiple tools in the '${category}' category: ${toolNames.join(', ')}. Consider consolidating to save costs.`,
            date: new Date().toISOString(),
          });
        }
      });
      
      setAlerts(newAlerts);
    };
    
    generateAlerts();

  }, [tools, annualBudget]);


  const addTool = (tool) => {
    setTools((prev) => [...prev, tool]);
  };

  const removeTool = (id) => {
    setTools((prev) => prev.filter((t) => t.id !== id));
  };

  const updateAnnualBudget = (newBudget) => {
    setAnnualBudget(newBudget);
  };
  
  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  }

  return (
    <ToolContext.Provider value={{ tools, addTool, removeTool, annualBudget, updateAnnualBudget, alerts, dismissAlert }}>
      {children}
    </ToolContext.Provider>
  );
};

export const useTools = () => useContext(ToolContext);
