import SettingsPage from '../../components/SettingsPage';

export default function BuyerSettings() {
  return <SettingsPage title="Organizer Settings" groups={[
    { title: 'Account', fields: ['Name', 'Email', 'Phone', 'Profile Picture'] },
    { title: 'Security', fields: ['Change Password', 'Two-Factor Authentication'] },
    { title: 'Notifications', fields: ['Booking Notifications', 'Messages', 'Reviews', 'Email Notifications'] },
    { title: 'Privacy', fields: ['Profile Visibility', 'Communication Preferences'] },
  ]} />;
}
