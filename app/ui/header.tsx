'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import PoeOAuthButton from '@/components/ui/PoeOAuthButton';

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
    { name: 'Top', path: '/' },   
    { name: 'Login Test', path: '/login' },
    { name: 'Check', path: '/check' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link href={item.path} passHref key={item.name}>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User Action */}
        <div className="hidden md:block">
          <PoeOAuthButton />
        </div>

      </div>
    </header>
  );
};

export default Header;