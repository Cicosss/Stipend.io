import React from 'react';
import { Link } from 'react-router-dom';
import { AppView } from '@/src/types';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView }) => {
  return (
    <nav className="bg-slate-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/\" className="text-xl font-bold">Stipend.io</Link>
        <div className="space-x-4">
          <Link to="/" className={`${currentView === AppView.Dashboard ? 'text-emerald-400' : ''}`}>
            Dashboard
          </Link>
          <Link to="/payslips" className={`${currentView === AppView.PayslipList ? 'text-emerald-400' : ''}`}>
            Buste Paga
          </Link>
          <Link to="/leave-permits" className={`${currentView === AppView.LeavePermitManagement ? 'text-emerald-400' : ''}`}>
            Ferie e Permessi
          </Link>
          <Link to="/settings" className={`${currentView === AppView.Settings ? 'text-emerald-400' : ''}`}>
            Impostazioni
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;