import React from 'react';
import { Payslip } from '@/types';

interface AddEditPayslipPageProps {
  payslips: Payslip[];
  onSave: (payslip: Payslip) => void;
}

const AddEditPayslipPage: React.FC<AddEditPayslipPageProps> = ({ payslips, onSave }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Aggiungi/Modifica Busta Paga</h1>
      {/* Add/Edit form content will be implemented later */}
    </div>
  );
};