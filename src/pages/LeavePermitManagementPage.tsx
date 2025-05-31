import React from 'react';
import { LeavePermitRecord } from '@/src/types';

interface LeavePermitManagementPageProps {
  records: LeavePermitRecord[];
  onSave: (record: LeavePermitRecord) => void;
  onDelete: (id: string) => void;
}

const LeavePermitManagementPage: React.FC<LeavePermitManagementPageProps> = ({ records, onSave, onDelete }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestione Ferie e Permessi</h1>
      {/* Leave permits management content will be implemented later */}
    </div>
  );
};

export default LeavePermitManagementPage;