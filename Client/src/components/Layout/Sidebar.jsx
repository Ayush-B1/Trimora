import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Home, ShoppingCart, AlertTriangle, BarChart } from 'lucide-react';
import { useTools } from '@/context/ToolContext';
import { Badge } from '@/components/ui/badge';

const Sidebar = () => {
  const { alerts } = useTools();
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Tools', path: '/tools', icon: ShoppingCart },
    { name: 'Alerts', path: '/alerts', icon: AlertTriangle, alertCount: alerts.length },
    { name: 'Insights', path: '/insights', icon: BarChart },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r bg-white dark:bg-gray-900 md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">Trimora</h2>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: isActive ? "secondary" : "ghost" }),
                "w-full justify-start"
              )
            }
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.name}
            {link.alertCount > 0 && <Badge variant="destructive" className="ml-auto">{link.alertCount}</Badge>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;