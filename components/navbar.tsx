"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menu,
  X,
  Home,
  ImageIcon,
  User,
  MessageSquare,
  Settings,
  CreditCard,
  LogOut,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { useTheme } from "next-themes"

interface NavItemProps {
  href: string
  label: string
  icon?: React.ReactNode
  active?: boolean
  onClick?: () => void
}

function NavItem({ href, label, icon, active, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "nav-item flex items-center gap-2",
        active ? "nav-item-active" : "text-foreground/70 hover:text-foreground hover:bg-accent/50",
      )}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
    >
      {icon && (
        <span className="w-4 h-4" aria-hidden="true">
          {icon}
        </span>
      )}
      {label}
    </Link>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { theme, setTheme } = useTheme()

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="h-4 w-4" />,
    },
    {
      href: "/generate-images",
      label: "Generate Images",
      icon: <ImageIcon className="h-4 w-4" />,
    },
    {
      href: "/create-characters",
      label: "Create Characters",
      icon: <User className="h-4 w-4" />,
    },
    {
      href: "/chat",
      label: "AI Chat",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      href: "/billing",
      label: "Subscriptions",
      icon: <CreditCard className="h-4 w-4" />,
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-transparent",
      )}
      role="banner"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2" aria-label="AI Creator Platform Home">
            <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="font-bold text-xl hidden sm:inline-block gradient-text">AI Creator</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {routes.map((route) => (
            <NavItem key={route.href} href={route.href} label={route.label} active={pathname === route.href} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            <span className="sr-only">{theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}</span>
            <div className="relative w-5 h-5">
              <div className={`absolute inset-0 transition-opacity ${theme === "dark" ? "opacity-100" : "opacity-0"}`}>
                <Sun className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className={`absolute inset-0 transition-opacity ${theme === "dark" ? "opacity-0" : "opacity-100"}`}>
                <Moon className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image || ""} alt={user.name || "User avatar"} />
                    <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/billing">
                    <CreditCard className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>Billing</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default" size="sm" className="glow-effect">
              <Link href="/login">Sign In</Link>
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px] pr-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
                    <span className="font-bold text-lg">AI Creator</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
                  {routes.map((route) => (
                    <NavItem
                      key={route.href}
                      href={route.href}
                      label={route.label}
                      icon={route.icon}
                      active={pathname === route.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  ))}
                </nav>
                <div className="mt-auto pt-6">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 px-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.image || ""} alt={user.name || "User avatar"} />
                          <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          signOut()
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                        Log out
                      </Button>
                    </div>
                  ) : (
                    <Button asChild className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/login">Sign In</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

