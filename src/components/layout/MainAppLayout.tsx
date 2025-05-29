import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("grid grid-rows-[auto_1fr] h-screen bg-background", className)}>
      <Header />
      <main className="min-w-0 overflow-y-auto p-6 flex flex-col gap-6">
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;
