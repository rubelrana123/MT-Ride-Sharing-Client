import { useState } from "react";
import { Link } from "react-router";
import {
  Car,
  Menu,
  X,
  User,
  
  LayoutDashboard,
  MenuSquare,
  Contact2,
  FileQuestion,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/layout/mode.toggler";
import { useAppDispatch } from "@/redux/hook";
import { Logo } from "@/assets/icons/Logo";
import ProfileAvatar from "./ProfileAvatar";
import { userApi } from "@/redux/features/user/user.api";
import { toast } from "sonner";
import { useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
 

// Navigation links with roles
const navigationLinks = [
  { href: "/", label: "Home", icon: Car, role: "PUBLIC" },
  { href: "/about", label: "About", icon: MenuSquare, role: "PUBLIC" },
  { href: "/features", label: "Features", icon: MenuSquare, role: "PUBLIC" },
  { href: "/faq", label: "FAQ", icon: FileQuestion, role: "PUBLIC" },

  { href: "/contact", label: "Contact", icon: Contact2, role: "PUBLIC" },

 
  { href: "/riders/ride-book", label: "Book a Ride", icon: Car, role: "RIDER" },//rider
  { href: "/riders/driver-application", label: "Become a Drive", icon: Car, role: "RIDER" },//driver
  { href: "/riders", label: "Dashboard", icon: LayoutDashboard, role: "RIDER" },//admin
  { href: "/drivers", label: "Dashboard", icon: LayoutDashboard, role: "DRIVER" },//admin
  { href: "/admin", label: "Admin Panel", icon: LayoutDashboard, role: "ADMIN" },//admin
  { href: "/super-admin", label: "Dashboard", icon: LayoutDashboard, role: "SUPER_ADMIN" },//SUPER_ADMIN
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { data , isLoading } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  !isLoading && console.log("user data", data)
  const handleLogout = async () => {
     try {
      await logout(undefined);
      dispatch(userApi.util.resetApiState())
      toast.success("Logout Successfully")
    } catch {
      toast.error("Logout failed!")
    }
  };


  return (
    <nav className="bg-background shadow-lg border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
 
              <Logo/>
             
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
            <ModeToggle />


            {
              
            data?.data?.email ? (
           
            <ProfileAvatar name={data?.data?.name} userRole={data?.data?.role} logOutFn={handleLogout} />
          ) : (
            <Button asChild variant="default" size="sm" className="text-sm">
              <Link to="/login">Log In</Link>
            </Button>
            )  }
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
            {
              
            data?.data?.email ? (
           
            <ProfileAvatar name={data?.data?.name} userRole={data?.data?.role} logOutFn={handleLogout} />
          ) : (
            <Button asChild variant="default" size="sm" className="text-sm">
              <Link to="/login">Log In</Link>
            </Button>
            )  }
                  </>
                )}
                <div className="flex justify-start ">
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
