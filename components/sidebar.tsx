"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CreditCard, Home, Image, LogIn, LogOut, Menu, MessageSquare, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/hooks/use-auth"
import { useMobile } from "@/hooks/use-mobile"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

function NavItem({ href, icon, label, active, onClick }: NavItemProps) {
  return (
    <Button
      asChild
      variant={active ? "secondary" : "ghost"}
      size="lg"
      className={cn("justify-start w-full", active ? "bg-secondary text-secondary-foreground" : "")}
      onClick={onClick}
    >
      <Link href={href}>
        {icon}
        <span className="ml-2">{label}</span>
      </Link>
    </Button>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isMobile = useMobile()
  const { user, signOut } = useAuth()

  const routes = [
    {
      href: "/",
      icon: <Home className="h-5 w-5" />,
      label: "Home",
    },
    {
      href: "/generate-images",
      icon: <Image className="h-5 w-5" />,
      label: "Generate Images",
    },
    {
      href: "/create-characters",
      icon: <User className="h-5 w-5" />,
      label: "Create Characters",
    },
    {
      href: "/chat",
      icon: <MessageSquare className="h-5 w-5" />,
      label: "AI Chat",
    },
    {
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
    },
    {
      href: "/billing",
      icon: <CreditCard className="h-5 w-5" />,
      label: "Billing",
    },
  ]

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="px-3 py-4">
        <h2 className="text-lg font-bold mb-4 px-4">AI Creator Platform</h2>
        <div className="space-y-1">
          {routes.map((route) => (
            <NavItem
              key={route.href}
              href={route.href}
              icon={route.icon}
              label={route.label}
              active={pathname === route.href}
              onClick={isMobile ? () => setOpen(false) : undefined}
            />
          ))}
        </div>
      </div>
      <div className="mt-auto px-3 py-4">
        {user ? (
          <Button
            variant="ghost"
            size="lg"
            className="justify-start w-full"
            onClick={() => {
              signOut()
              if (isMobile) setOpen(false)
            }}
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-2">Log out</span>
          </Button>
        ) : (
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="justify-start w-full"
            onClick={isMobile ? () => setOpen(false) : undefined}
          >
            <Link href="/login">
              <LogIn className="h-5 w-5" />
              <span className="ml-2">Log in</span>
            </Link>
          </Button>
        )}
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-80 bg-background border-r">
      {sidebarContent}
    </div>
  )
}

