'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Leagues', path: '/leagues' },
  { name: 'Characters', path: '/characters' },
  { name: 'Items', path: '/items' },
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
            <Link href={item.path} passHref >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User Action */}
        <div className="hidden md:block">
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md flex items-center">
            <User className="mr-2" size={18} />
            Signin with PoE
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;