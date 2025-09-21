import type { Step } from "react-joyride";

// রাইডারের জন্য ট্যুরের ধাপ
export const riderTourSteps: Step[] = [
  {
    target: ".tour-step-1-request-ride", // CSS class for the Request Ride button/link
    content:
      "Click here to start booking your first ride. You can select your pickup and destination on the map.",
    title: "Book a Ride",
    placement: "right",
  },
  {
    target: ".tour-step-2-active-ride",
    content:
      "After your ride is accepted, you can track your driver and see the status here.",
    title: "Track Your Ride",
  },
  {
    target: ".tour-step-3-apply-driver", // CSS class for the Ride History link
    content:
      "If you want to become a driver, you can apply from here by submitting your details and documents.",
    title: "Apply For Driver",
  },
  {
    target: ".tour-step-4-ride-history", // CSS class for the Ride History link
    content:
      "After completing a trip, you can see all your past ride details here.",
    title: "Your Ride History",
  },
  {
    target: ".tour-step-5-profile-menu", // CSS class for the Profile avatar/dropdown
    content: "Manage your profile, settings, and password from this menu.",
    title: "Your Account",
  },
];



export const driverTourSteps: Step[] = [

  {
    target: '.tour-step-1-analytics',
    content: 'Welcome! This is your analytics dashboard where you can see your total earnings, rides, and performance.',
    title: 'Your Analytics',
  },
  {
    target: '.tour-step-2-availability', 
    content: 'Toggle this switch to go online. You will only receive new ride requests when you are online.',
    title: 'Your Availability',
  },
  {
    target: '.tour-step-3-incoming-requests',
    content: 'New ride requests from nearby riders will appear on this page.',
    title: 'Find New Rides',
  },
  {
    target: '.tour-step-4-active-ride',
    content: 'Once you accept a ride, you can manage it from here.',
    title: 'Manage Active Ride',
  },
  {
    target: '.tour-step-5-ride-history',
    content: 'Here you can see your completed ride history.',
    title: 'Ride History',
  },
  {
    target: '.tour-step-6-profile-menu',
    content: 'Manage your personal and vehicle information from this menu.',
    title: 'Your Account',
  },
]