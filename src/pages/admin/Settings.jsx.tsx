import SettingsPage from '../../components/SettingsPage';
export default function AdminSettings() {
  return <SettingsPage title="Platform Settings" accent="violet" groups={[
    { title: 'General Settings', fields: ['Platform Name', 'Logo', 'Email', 'Phone', 'Location'] },
    { title: 'Admin Account', fields: ['Name', 'Email', 'Profile Picture', 'Password'] },
    { title: 'Security', fields: ['Two-Factor Authentication', 'Login Activity', 'Session Management'] },
    { title: 'Notifications', fields: ['New Users', 'New Sellers', 'New Services', 'New Bookings', 'New Reviews'] },
    { title: 'Platform Settings', fields: ['Service Approval', 'Review Moderation', 'User Registration', 'Seller Registration'] },
  ]} />;
}
