import React from 'react';
import { Payslip, LeavePermitRecord, UserSettings } from '../types';

interface DashboardPageProps {
  payslips: Payslip[];
  leavePermits: LeavePermitRecord[];
  userSettings: UserSettings;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ payslips, leavePermits, userSettings }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {/* Dashboard content will be implemented later */}
    </div>
  );
};

export default DashboardPage;