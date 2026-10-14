import SettingsPage from '../../components/SettingsPage';
export default function SellerSettings() {
  return <SettingsPage title="Provider Settings" accent="emerald" groups={[
    { title: 'Business Settings', fields: ['Business Information', 'Business Category', 'Location', 'Business Hours'] },
    { title: 'Account', fields: ['Name', 'Email', 'Phone', 'Password'] },
    { title: 'Notifications', fields: ['Booking Notifications', 'Customer Messages', 'Reviews', 'Payment Notifications'] },
    { title: 'Payment Settings', fields: ['Payment Method', 'Account Information'] },
    { title: 'Security', fields: ['Change Password', 'Two-Factor Authentication', 'Login Activity'] },
  ]} />;
}
