import React from 'react';
import { Payslip } from '@/types';

interface ViewPayslipPageProps {
  payslips: Payslip[];
  onUpdatePayslip: (payslip: Payslip) => void;
}

const ViewPayslipPage: React.FC<ViewPayslipPageProps> = ({ payslips, onUpdatePayslip }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Visualizza Busta Paga</h1>
      {/* View payslip content will be implemented later */}
    </div>
  );
};

export default ViewPayslipPage