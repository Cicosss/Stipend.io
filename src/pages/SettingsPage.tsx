import React from 'react';
import { UserSettings } from '../types';

interface SettingsPageProps {
  userSettings: UserSettings;
  onSaveUserSettings: (settings: UserSettings) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ userSettings, onSaveUserSettings }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Impostazioni</h1>
      {/* Settings content will be implemented later */}
    </div>
  );
};

export default SettingsPage;