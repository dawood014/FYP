import { createBrowserRouter } from 'react-router';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import BuyerLayout from './layouts/BuyerLayout';
import SellerLayout from './layouts/SellerLayout';
import AdminLayout from './layouts/AdminLayout';
import { RequireRole } from './auth/AuthProvider';

// Public
import Home from './pages/public/Home';
import PublicServices from './pages/public/Services';
import Contact from './pages/public/Contact';
import HelpCenter from './pages/public/HelpCenter';
import { InfoPage } from './pages/public/InfoPages';

// Auth
import Login from './pages/auth/Login';
import SignupRole from './pages/auth/SignupRole';
import OrganizerSignup from './pages/auth/OrganizerSignup';
import ProviderSignup from './pages/auth/ProviderSignup';

// Buyer
import BuyerDashboard from './pages/buyer/BuyerDashboard.jsx.tsx';
import MyEvents from './pages/buyer/Events.jsx.tsx';
import CreateEvent from './pages/buyer/CreateEvent';
import EventWorkspace from './pages/buyer/EventWorkspace.jsx.tsx';
import FindServices from './pages/buyer/FindServices.jsx.tsx';
import ProviderProfile from './pages/buyer/ProviderProfile.jsx.tsx';
import RequestQuote from './pages/buyer/RequestQuote.jsx.tsx';
import RequestsOffers from './pages/buyer/RequestsOffers.jsx.tsx';
import QuoteDetails from './pages/buyer/QuoteDetails.jsx.tsx';
import Messages from './pages/buyer/Messages.jsx.tsx';
import Booking from './pages/buyer/Booking.jsx.tsx';
import BuyerBookings from './pages/buyer/BuyerBookings';
import Payment from './pages/buyer/Payment.jsx.tsx';
import Review from './pages/buyer/Review.jsx.tsx';
import BuyerProfile from './pages/buyer/Profile.jsx.tsx';
import BuyerSettings from './pages/buyer/Settings.jsx.tsx';

// Seller
import SellerDashboard from './pages/seller/Dashboard.jsx.tsx';
import BusinessProfile from './pages/seller/BusinessProfile.jsx.tsx';
import SellerServices from './pages/seller/Services.jsx.tsx';
import CustomerRequests from './pages/seller/CustomerRequests.jsx.tsx';
import CreateQuote from './pages/seller/CreateQuote.jsx.tsx';
import SellerBookings from './pages/seller/Bookings.jsx.tsx';
import SellerMessages from './pages/seller/Messages.jsx.tsx';
import Earnings from './pages/seller/Earnings.jsx.tsx';
import ServiceForm from './pages/seller/ServiceForm.jsx.tsx';
import Analytics from './pages/seller/Analytics.jsx.tsx';
import SellerSettings from './pages/seller/Settings.jsx.tsx';

// Admin
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/AdminDashboard.jsx.tsx';
import AdminUsers from './pages/admin/Users.jsx.tsx';
import AdminSellers from './pages/admin/Sellers.jsx.tsx';
import AdminVerification from './pages/admin/Verification.jsx.tsx';
import AdminServices from './pages/admin/Services.jsx.tsx';
import AdminEvents from './pages/admin/Events.jsx.tsx';
import AdminBookings from './pages/admin/Bookings.jsx.tsx';
import AdminPayments from './pages/admin/Payments.jsx.tsx';
import AdminCommissions from './pages/admin/Commissions,jsx.tsx';
import AdminReviews from './pages/admin/Reviews.jsx.tsx';
import AdminDisputes from './pages/admin/Disputes.jsx.tsx';
import AdminReports from './pages/admin/Reports.jsx.tsx';
import AdminSettings from './pages/admin/Settings.jsx.tsx';

export const router = createBrowserRouter([
  {
    Component: PublicLayout,
    children: [
      { index: true, Component: Home },
      { path: 'services', Component: PublicServices },
      { path: 'about', Component: () => <InfoPage type="about" /> },
      { path: 'contact', Component: Contact },
      { path: 'help', Component: HelpCenter },
      { path: 'privacy', Component: () => <InfoPage type="privacy" /> },
      { path: 'terms', Component: () => <InfoPage type="terms" /> },
    ],
  },
  // Auth (no layout)
  { path: '/login', Component: Login },
  { path: '/signup', Component: SignupRole },
  { path: '/signup/organizer', Component: OrganizerSignup },
  { path: '/signup/provider', Component: ProviderSignup },
  { path: '/admin/login', Component: AdminLogin },

  // Buyer portal
  {
    path: '/buyer',
    Component: () => <RequireRole role="buyer"><BuyerLayout /></RequireRole>,
    children: [
      { index: true, Component: BuyerDashboard },
      { path: 'events', Component: MyEvents },
      { path: 'create-event', Component: CreateEvent },
      { path: 'event-workspace', Component: EventWorkspace },
      { path: 'find-services', Component: FindServices },
      { path: 'provider/:id', Component: ProviderProfile },
      { path: 'request-quote', Component: RequestQuote },
      { path: 'requests', Component: RequestsOffers },
      { path: 'quote-details', Component: QuoteDetails },
      { path: 'messages', Component: Messages },
      { path: 'bookings', Component: BuyerBookings },
      { path: 'booking', Component: Booking },
      { path: 'payment', Component: Payment },
      { path: 'review', Component: Review },
      { path: 'notifications', Component: () => <div className="text-center py-20 text-slate-400">Notifications â€” coming soon</div> },
      { path: 'profile', Component: BuyerProfile },
      { path: 'settings', Component: BuyerSettings },
    ],
  },

  // Seller portal
  {
    path: '/seller',
    Component: () => <RequireRole role="seller"><SellerLayout /></RequireRole>,
    children: [
      { index: true, Component: SellerDashboard },
      { path: 'profile', Component: BusinessProfile },
      { path: 'services', Component: SellerServices },
      { path: 'services/new', Component: ServiceForm },
      { path: 'services/:id/edit', Component: ServiceForm },
      { path: 'requests', Component: CustomerRequests },
      { path: 'create-quote', Component: CreateQuote },
      { path: 'quotations', Component: () => <div className="text-center py-20 text-slate-400">Quotations sent</div> },
      { path: 'bookings', Component: SellerBookings },
      { path: 'messages', Component: SellerMessages },
      { path: 'earnings', Component: Earnings },
      { path: 'analytics', Component: Analytics },
      { path: 'settings', Component: SellerSettings },
      { path: 'notifications', Component: () => <div className="bg-white rounded-2xl border border-slate-100 p-8"><h1 className="text-2xl font-extrabold text-[#0f1f3d]">Notifications</h1><p className="text-sm text-slate-500 mt-2">You are all caught up. New booking, message, and payment updates will appear here.</p></div> },
    ],
  },

  // Admin portal
  {
    path: '/admin',
    Component: () => <RequireRole role="admin"><AdminLayout /></RequireRole>,
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'users', Component: AdminUsers },
      { path: 'sellers', Component: AdminSellers },
      { path: 'verification', Component: AdminVerification },
      { path: 'services', Component: AdminServices },
      { path: 'events', Component: AdminEvents },
      { path: 'bookings', Component: AdminBookings },
      { path: 'payments', Component: AdminPayments },
      { path: 'commissions', Component: AdminCommissions },
      { path: 'reviews', Component: AdminReviews },
      { path: 'disputes', Component: AdminDisputes },
      { path: 'reports', Component: AdminReports },
      { path: 'settings', Component: AdminSettings },
    ],
  },
]);

