'use client';

import React from 'react';
import Link from 'next/link';
import { Home, LogIn, Settings, LucideIcon } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { name: 'Reserve', href: '/reserve', icon: Home },
  { name: 'Reserve', href: '/reserve', icon: LogIn },
  { name: 'Reserve', href: '/reserve', icon: LogIn },
];

interface SideNavigationProps {
  logo?: string;
  copyrightText?: string;
}

const SideNavigation: React.FC<SideNavigationProps> = ({
  logo = 'PoE-JP.com',
  copyrightText = 'Path of Exile Japan Community',
}) => {

  return (
    <nav className="w-58 h-screen bg-gray-800 text-white p-4 fixed left-0 top-0">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 mb-8">
        <Link href="/" passHref>
          <h1 className="text-2xl font-bold">{logo}</h1>
        </Link>
        </div>
        <ul className="space-y-2 flex-grow">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link href={item.href} passHref>
                    <p>{item.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto">
          <p className="text-sm text-gray-400">{copyrightText}</p>
        </div>
      </div>
    </nav>
  );
};

export default SideNavigation;