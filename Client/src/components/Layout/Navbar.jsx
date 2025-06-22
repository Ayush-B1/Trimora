// src/components/Layout/Navbar.jsx

import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">Trimora</h1>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-gray-100 pl-8 dark:bg-gray-800"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => alert('Logout clicked')}>
        Logout
        </Button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    </div>
    </header>
  );
};

export default Navbar;
