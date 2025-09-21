import type { RideType } from "@/types/ride.type";
import { BikeIcon, Car, CheckCircle, Clock, CreditCard, DollarSign, LucideBike, MapPin, Shield } from "lucide-react";

export const rideTypes: RideType[] = [
  { id: "scooter", name: "Scooter", icon: LucideBike, price: 1, color: "bg-blue-500" },
  { id: "bike", name: "Bike", icon: BikeIcon, price: 2, color: "bg-green-500" },
  { id: "nac", name: "N/A Car", icon: Car, price: 3, color: "bg-blue-600" },
  { id: "ac", name: "AC Car", icon: Car, price: 4, color: "bg-orange-500" },
];

import L from "leaflet";

export const pickupIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const destinationIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
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
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/team/sarah.jpg",
    bio: "With 15 years in transportation tech, Sarah founded MyTrip to revolutionize urban mobility.",
    linkedin: "#",
    email: "sarah@MyTrip.com",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "/team/michael.jpg",
    bio: "Former Google engineer passionate about building scalable, user-friendly transportation solutions.",
    linkedin: "#",
    email: "michael@MyTrip.com",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    image: "/team/emily.jpg",
    bio: "Operations expert ensuring safe, efficient rides and exceptional customer experiences.",
    linkedin: "#",
    email: "emily@MyTrip.com",
  },
];