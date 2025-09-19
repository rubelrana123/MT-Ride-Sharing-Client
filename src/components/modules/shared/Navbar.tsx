import { useState } from "react";
import { Link } from "react-router";
import {
  Car,
  Menu,
  X,
  User,
  Bell,
  Settings,
  LayoutDashboard,
  MenuSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/layout/mode.toggler";
// import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import Logo from "@/assets/icons/Logo";

// Navigation links with roles
const navigationLinks = [
  { href: "/", label: "Home", icon: Car, role: "PUBLIC" },
  { href: "/about", label: "About", icon: MenuSquare, role: "PUBLIC" },
  { href: "/ride-book", label: "Book a Ride", icon: Car, role: "RIDER" },//rider
  { href: "/drivers/driver-application", label: "Become a Drive", icon: Car, role: "RIDER" },//driver
  { href: "/rider", label: "Dashboard", icon: LayoutDashboard, role: "RIDER" },//admin
  { href: "/driver", label: "Dashboard", icon: LayoutDashboard, role: "DRIVER" },//admin
  { href: "/admin", label: "Admin Panel", icon: LayoutDashboard, role: "ADMIN" },//admin
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, role: "SUPER_ADMIN" },//SUPER_ADMIN
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  console.log("user data", data)
  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <nav className="bg-background shadow-lg border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              {/* <div className="bg-primary p-2 rounded-lg">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div> */}
              <Logo/>
              {/* <span className="text-xl font-bold text-foreground">MT Ride</span> */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link, index) => {
              if (
                link.role === "PUBLIC" ||
                link.role === data?.data?.role
              ) {
                const Icon = link.icon;
                return (
                  <Link
                    key={index}
                    to={link.href}
                    className="text-foreground/80 hover:text-primary transition-colors duration-200 flex items-center space-x-1"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              }
              return null;
            })}
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

            <ModeToggle />

            {data?.data?.email ? (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            ) : (
              <>
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
              </>
            )}
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
              {navigationLinks.map((link, index) => {
                if (
                  link.role === "PUBLIC" ||
                  link.role === data?.data?.role
                ) {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={index}
                      to={link.href}
                      className="text-foreground/80 hover:text-primary block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  );
                }
                return null;
              })}

              {/* Mobile User Actions */}
              <div className="pt-4 border-t border-border space-y-2">
                {data?.data?.email ? (
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <>
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
                  </>
                )}
                <div className="flex justify-start">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
