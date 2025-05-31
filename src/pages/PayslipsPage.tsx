import React from 'react';
import { Payslip } from '@/types';

interface PayslipsPageProps {
  payslips: Payslip[];
  onDeletePayslip: (id: string) => void;
}

const PayslipsPage: React.FC<PayslipsPageProps> = ({ payslips, onDeletePayslip }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Buste Paga</h1>
      {/* Payslips list content will be implemented later */}
    </div>
  );
};