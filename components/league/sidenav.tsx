"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Settings, Users, HelpCircle, Menu, ChevronRight } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { title: "Home", href: "/events/1", icon: <Home className="w-4 h-4" /> },
  { title: "エントリー", href: "/events/register", icon: <Users className="w-4 h-4" /> },
  { title: "Settings", href: "/settings", icon: <Settings className="w-4 h-4" /> },
  { title: "Help", href: "/help", icon: <HelpCircle className="w-4 h-4" /> },
]

export default function SideNavigation() {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  return (
    <>
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex items-center justify-between p-4">
            <span className="text-lg font-semibold">Navigation</span>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          <ScrollArea className="flex-1 p-4">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800",
                    pathname === item.href ? "bg-gray-100 dark:bg-gray-800" : "transparent"
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-40 md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SideNavigation />
        </SheetContent>
      </Sheet>
    </>
  )
}