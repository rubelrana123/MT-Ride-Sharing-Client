import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { 
  Car, 
  Menu, 
  X, 
  User, 
  Bell, 
  Settings,
  LayoutDashboard
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-background shadow-lg border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">MT Ride</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/ride" 
              className="text-foreground/80 hover:text-primary transition-colors duration-200 flex items-center space-x-1"
            >
              <Car className="h-4 w-4" />
              <span>Book a Ride</span>
            </Link>
            <Link 
              to="/drive" 
              className="text-foreground/80 hover:text-primary transition-colors duration-200 flex items-center space-x-1"
            >
              <Car className="h-4 w-4" />
              <span>Drive</span>
            </Link>
            <Link 
              to="/dashboard" 
              className="text-foreground/80 hover:text-primary transition-colors duration-200 flex items-center space-x-1"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Button>
            
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>

            <ThemeToggle />

            <Link to="/login">
              <Button variant="outline" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>

            <Link to="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              <Link
                to="/ride"
                className="text-foreground/80 hover:text-primary block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Car className="h-4 w-4" />
                <span>Book a Ride</span>
              </Link>
              <Link
                to="/drive"
                className="text-foreground/80 hover:text-primary block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Car className="h-4 w-4" />
                <span>Drive</span>
              </Link>
              <Link
                to="/dashboard"
                className="text-foreground/80 hover:text-primary block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              
              {/* Mobile User Actions */}
              <div className="pt-4 border-t border-border space-y-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-primary hover:opacity-90 text-primary-foreground" size="sm">
                  Register
                  </Button>
                </Link>
                <div className="flex justify-start">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
