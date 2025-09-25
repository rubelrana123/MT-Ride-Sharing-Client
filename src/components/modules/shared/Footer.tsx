import { Logo } from "@/assets/icons/Logo";
import { useGetUserProfileQuery } from "@/redux/features/user/user.api";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  Mail,
  Phone,
  Shield,
} from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { data } = useGetUserProfileQuery(undefined);
  const role = data?.role || "Guest";

  const getRoleBasedLinks = (userRole: string) => {
    switch(userRole) {
      case "DRIVER":
        return [
          { name: "Dashboard", href: "/drivers/dashboard" },
          { name: "Earnings", href: "/drivers/earnings" },
          { name: "Trip History", href: "/drivers/trips" },
        ];
      case "RIDER":
        return [
          { name: "Book Ride", href: "/riders/ride-book" },
          { name: "Ride History", href: "/riders/history" },
          { name: "My Profile", href: "/dashboard/profile" },
        ];
      case "ADMIN":
        return [
          { name: "Dashboard", href: "/admin/dashboard" },
          { name: "Manage Users", href: "/admin/users" },
          { name: "Analytics", href: "/admin/analytics" },
        ];
      default:
        return [
          { name: "Book Ride", href: "/login" },
          { name: "Become a Driver", href: "/driver/signup" },
          { name: "About", href: "/about" },
        ];
    }
  };

  const supportLinks = [
    { name: "Help Center", href: "/ " },
    { name: "Safety", href: "/" },
    { name: "Privacy Policy", href: "/" },
    { name: "Terms of Service", href: "/" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "/" },
    { name: "Twitter", icon: Twitter, href: "/" },
    { name: "Instagram", icon: Instagram, href: "/" },
    { name: "LinkedIn", icon: Linkedin, href: "/" },
  ];

  const roleBasedLinks = getRoleBasedLinks(role);

  return (
    <footer className="bg-background text-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center space-x-2">
              <div className="flex items-center justify-center">
                <Logo />
              </div>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              Safe, reliable, and affordable rides 24/7 with just a few taps.
            </p>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@MyTrip.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-2 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Role-Based Links */}
          <div>
            <h3 className="font-semibold mb-4">{role} Links</h3>
            <ul className="space-y-2">
              {roleBasedLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t text-xs text-muted-foreground space-y-3 md:space-y-0">
          <p>© {currentYear} MyTrip. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            {role !== "Guest" && (
              <div className="flex items-center space-x-1">
                <Shield className="h-3 w-3 text-primary" />
                <span>Secure Platform</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
