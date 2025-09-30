import L from "leaflet";
import type { RideType } from "@/types/ride.type";
import {
  BikeIcon,
  Car,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  LucideBike,
  MapPin,
  Shield,
  Phone,
  Mail,
  Settings,
  BarChart3,
  Star,
  HistoryIcon,
  Eye,
  Users,
} from "lucide-react";

export const rideTypes: RideType[] = [
  {
    id: "scooter",
    name: "Scooter",
    icon: LucideBike,
    price: 1,
    color: "bg-blue-500",
  },
  { id: "bike", name: "Bike", icon: BikeIcon, price: 2, color: "bg-green-500" },
  { id: "nac-car", name: "N/A Car", icon: Car, price: 3, color: "bg-blue-600" },
  { id: "ac-car", name: "AC Car", icon: Car, price: 4, color: "bg-orange-500" },
];

 

export const pickupIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const destinationIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
export const faqs = [
  {
    id: "payment",
    question: "Do you accept cash payments?",
    answer:
      "Yes! MyTrip is unique in that we accept cash payments exclusively. Simply pay your driver in cash at the end of your ride. No credit card or digital payment required.",
  },
  {
    id: "booking",
    question: "How do I book a ride?",
    answer:
      "Booking is simple! Enter your pickup location and destination in our app or website, confirm your details, and we'll match you with the nearest available driver. You'll see their details and estimated arrival time.",
  },
  {
    id: "safety",
    question: "How do you ensure rider and driver safety?",
    answer:
      "Safety is our top priority. All drivers undergo background checks, vehicle inspections, and identity verification. Rides are tracked in real-time, and we have 24/7 support for any safety concerns.",
  },
  {
    id: "pricing",
    question: "How is the ride fare calculated?",
    answer:
      "Our fares are calculated based on distance, time, and current demand. You'll see the estimated fare before confirming your ride, and the final amount is calculated at the end of your trip.",
  },
  {
    id: "availability",
    question: "What are your service hours?",
    answer:
      "MyTrip operates 24/7 in all our service areas. Whether you need an early morning ride to the airport or a late-night trip home, our drivers are available around the clock.",
  },
  {
    id: "cancellation",
    question: "Can I cancel my ride?",
    answer:
      "Yes, you can cancel your ride before the driver arrives. If you cancel within 2 minutes of booking, there's no charge. After that, a small cancellation fee may apply to compensate the driver.",
  },
  {
    id: "driver-requirements",
    question: "What are the requirements to become a driver?",
    answer:
      "To drive with MyTrip, you need a valid driver's license, clean driving record, vehicle registration, insurance, and must pass our background check. Your vehicle must be 2010 or newer and pass our safety inspection.",
  },
  {
    id: "support",
    question: "How can I contact customer support?",
    answer:
      "Our support team is available 24/7 through the app, website chat, phone at 1-800-MyTrip, or email at support@MyTrip.com. We typically respond within 15 minutes during business hours.",
  },
  {
    id: "ratings",
    question: "How does the rating system work?",
    answer:
      "Both riders and drivers can rate each other after each trip on a 1-5 star scale. This helps maintain quality and safety standards. Ratings are anonymous and help build trust within our community.",
  },
  {
    id: "areas",
    question: "Which cities do you serve?",
    answer:
      "We currently operate in 15 major cities across the country, with plans to expand to more areas. Check our app or website to see if MyTrip is available in your location.",
  },
];

export const contactInfo = [
  {
    icon: MapPin,
    title: "Office Address",
    content: "Dinajpur, Bangladesh",
  },
  {
    icon: Phone,
    title: "Phone Number",
    content: "+880 1700-123456",
  },
  {
    icon: Mail,
    title: "Email Address",
    content: "support@mytrip.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "24/7 Customer Support",
  },
];

export const steps = [
  {
    icon: MapPin,
    title: "Book Your Ride",
    description:
      "Enter pickup location and destination. We'll find the nearest driver for you.",
  },
  {
    icon: CheckCircle,
    title: "Enjoy the Ride",
    description:
      "Relax while our verified driver safely takes you to your destination.",
  },
  {
    icon: CreditCard,
    title: "Pay in Cash",
    description:
      "Simple cash payment at the end of your ride. No cards or apps required.",
  },
];

export const highlights = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "All drivers are background-checked and vehicles are regularly inspected for your safety.",
    color: "text-primary",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description:
      "Transparent, competitive rates with no hidden fees. Cash payments make it accessible to everyone.",
    color: "text-green-500",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Need a ride at any time? Our drivers are available around the clock, every day of the year.",
    color: "text-primary",
  },
];
export const teamMembers = [
  {
    name: "Sarah Bennett",
    role: "CEO & Founder",
    image: "/team/sarah.jpg",
    bio: "Sarah has over 12 years of experience in the transportation industry and founded MyTrip to make urban travel safer and more convenient for everyone.",
    linkedin: "https://www.linkedin.com/in/sarah-bennett",
    email: "sarah.bennett@mytrip.com",
  },
  {
    name: "Michael Liu",
    role: "CTO",
    image: "/team/michael.jpg",
    bio: "Michael, a former software engineer at a leading tech company, leads MyTrip’s technology with a focus on reliability and seamless user experience.",
    linkedin: "https://www.linkedin.com/in/michael-liu",
    email: "michael.liu@mytrip.com",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    image: "/team/emily.jpg",
    bio: "Emily oversees daily operations to ensure every ride is safe, on time, and meets the highest standards of service.",
    linkedin: "https://www.linkedin.com/in/emily-rodriguez",
    email: "emily.rodriguez@mytrip.com",
  },
];


export const sortOptions = [
  { value: "createdAt-desc", label: "Date: Newest to Oldest" },
  { value: "createdAt-asc", label: "Date: Oldest to Newest" },
];

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "in-transit":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "accepted":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "requested":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

export const adminFeatures = [
  {
    icon: Settings,
    title: "Ride Management",
    description:
      "Monitor all active rides, resolve disputes, and ensure smooth operations across the entire platform.",
    highlight: "Complete oversight",
  },
  {
    icon: Users,
    title: "User Management",
    description:
      "Manage driver and rider profiles, verify identities, handle account issues, and maintain platform safety standards.",
    highlight: "User safety first",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Comprehensive insights into platform performance, user behavior, revenue trends, and operational metrics.",
    highlight: "Data-driven decisions",
  },
  {
    icon: Shield,
    title: "Safety Controls",
    description:
      "Advanced safety features including driver background checks, ride monitoring, and emergency response protocols.",
    highlight: "Enhanced security",
  },
];

export const riderFeatures = [
  {
    icon: MapPin,
    title: "Easy Ride Booking",
    description:
      "Book rides instantly with our simple interface. Enter pickup and destination, and we'll connect you with nearby drivers.",
    highlight: "One-tap booking",
  },
  {
    icon: CreditCard,
    title: "Cash-Only Payments",
    description:
      "No credit card required! Pay your driver directly in cash. Simple, secure, and accessible to everyone.",
    highlight: "100% Cash accepted",
  },
  {
    icon: Eye,
    title: "Live Ride Tracking",
    description:
      "See your driver's location in real-time, get accurate ETAs, and track your ride progress on our interactive map.",
    highlight: "Real-time GPS",
  },
  {
    icon: HistoryIcon,
    title: "Ride History",
    description:
      "Access your complete ride history with details on routes, duration, cost, and driver ratings for every trip.",
    highlight: "Complete records",
  },
];

export const driverFeatures = [
  {
    icon: CheckCircle,
    title: "Accept Ride Requests",
    description:
      "Receive instant notifications for nearby ride requests. Accept or decline based on your availability and preferences.",
    highlight: "Smart matching",
  },
  {
    icon: DollarSign,
    title: "Earning Summaries",
    description:
      "Track your daily and weekly earnings with detailed breakdowns. See completed trips, total distance, and payment summaries.",
    highlight: "Transparent earnings",
  },
  {
    icon: Clock,
    title: "Trip History",
    description:
      "Access your complete driving history with rider information, routes taken, and earnings per trip for easy record keeping.",
    highlight: "Detailed logs",
  },
  {
    icon: Star,
    title: "Rider Ratings",
    description:
      "Rate riders after each trip and see ratings from other drivers to help maintain a safe and respectful community.",
    highlight: "Two-way ratings",
  },
];

export const testimonials = [
{
name: "Maria Rodriguez",
rating: 5,
text: "Mytrip has truly been a lifesaver! I prefer paying with cash, and this platform makes it simple. The rides are always comfortable, and the drivers are professional.",
location: "Downtown Rider",
},
{
name: "David Chen",
rating: 5,
text: "I’ve been driving with Mytrip for six months, and it’s been an amazing experience. The app is easy to use, and I enjoy providing safe, reliable rides to the community.",
location: "Mytrip Driver",
},
{
name: "Sarah Johnson",
rating: 5,
text: "Fantastic service! I rely on Mytrip for my daily commute, and it’s always on time and dependable. The cash payment option is so convenient, and the drivers are great.",
location: "Regular Rider",
},
];
