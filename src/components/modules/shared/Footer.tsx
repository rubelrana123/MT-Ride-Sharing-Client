import { Link } from "react-router";
import { 
  Car, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Shield,
  Clock,
  Star,
  Globe
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">MT Ride</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted ride-sharing platform connecting passengers with reliable drivers. 
              Safe, affordable, and convenient transportation solutions for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ride" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Book a Ride
                </Link>
              </li>
              <li>
                <Link to="/drive" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Become a Driver
                </Link>
              </li>
              <li>
                <Link to="/business" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Business Solutions
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Package Delivery
                </Link>
              </li>
              <li>
                <Link to="/scheduled" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Scheduled Rides
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Safety Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Feedback
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">support@mtride.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  123 Transportation St<br />
                  City, State 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Safe & Secure</h4>
                <p className="text-gray-400 text-xs">Verified drivers and secure payments</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">24/7 Available</h4>
                <p className="text-gray-400 text-xs">Round-the-clock service</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-600 p-2 rounded-lg">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Top Rated</h4>
                <p className="text-gray-400 text-xs">4.8/5 customer rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2024 MT Ride. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Globe className="h-4 w-4" />
              <span>Available in 50+ cities</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
