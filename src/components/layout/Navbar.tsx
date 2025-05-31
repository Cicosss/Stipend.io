import React from 'react';
import { Link } from 'react-router-dom';
import { AppView } from '../../types';

const Navbar: React.FC<{ currentView: AppView; setCurrentView: (view: AppView) => void }> = ({ currentView, setCurrentView }) => {
  return (
    <nav className="bg-slate-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold" onClick={() => setCurrentView(AppView.Dashboard)}>
          Stipend.io
        </Link>
        <div className="flex space-x-4">
          <Link 
            to="/payslips" 
            className={`hover:text-gray-300 ${currentView === AppView.PayslipList ? 'text-green-400' : ''}`}
            onClick={() => setCurrentView(AppView.PayslipList)}
          >
            Buste Paga
          </Link>
          <Link 
            to="/leave-permits" 
            className={`hover:text-gray-300 ${currentView === AppView.LeavePermitManagement ? 'text-green-400' : ''}`}
            onClick={() => setCurrentView(AppView.LeavePermitManagement)}
          >
            Ferie e Permessi
          </Link>
          <Link 
            to="/settings" 
            className={`hover:text-gray-300 ${currentView === AppView.Settings ? 'text-green-400' : ''}`}
            onClick={() => setCurrentView(AppView.Settings)}
          >
            Impostazioni
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;