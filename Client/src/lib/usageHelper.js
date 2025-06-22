// src/lib/usageHelper.js

export const calculateInsights = (tools) => {
  const totalMonthly = tools.reduce((acc, tool) => acc + tool.cost, 0);
  const totalAnnual = totalMonthly * 12;

  const unusedCount = tools.filter(t => t.usage === 'unused').length;
  const unusedPercent = tools.length > 0 ? ((unusedCount / tools.length) * 100).toFixed(1) : 0;

  const topExpensive = [...tools]
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 3);

  return {
    totalMonthly,
    totalAnnual,
    unusedPercent,
    topExpensive
  };
};
