import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Payslip, LeavePermitRecord, AppView, UserSettings } from './types';
import { APP_NAME } from './constants';
import DashboardPage from './pages/DashboardPage';
import PayslipsPage from './pages/PayslipsPage';
import AddEditPayslipPage from './pages/AddEditPayslipPage';
import ViewPayslipPage from './pages/ViewPayslipPage';
import LeavePermitManagementPage from './pages/LeavePermitManagementPage';
import SettingsPage from './pages/SettingsPage';
import Navbar from './components/layout/Navbar';
import { 
  loadPayslipsFromStorage, 
  savePayslipsToStorage, 
  loadLeavePermitsFromStorage, 
  saveLeavePermitsToStorage,
  loadUserSettingsFromStorage,
  saveUserSettingsToStorage
} from './services/storageService';

// Defines the mapping between URL paths and AppView states
const pathToViewMap: Array<{ pathCheck: (p: string) => boolean; view: AppView }> = [
  { pathCheck: p => p.startsWith('/payslips/new'), view: AppView.AddPayslip },
  { pathCheck: p => p.startsWith('/payslips/edit/'), view: AppView.AddPayslip }, // edit also uses AddPayslip view contextually
  { pathCheck: p => p.startsWith('/payslips/view/'), view: AppView.ViewPayslip },
  { pathCheck: p => p.startsWith('/payslips'), view: AppView.PayslipList },
  { pathCheck: p => p.startsWith('/leave-permits'), view: AppView.LeavePermitManagement },
  { pathCheck: p => p.startsWith('/settings'), view: AppView.Settings },
  { pathCheck: p => p === '/', view: AppView.Dashboard },
];

const AppContent: React.FC = () => {
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [leavePermits, setLeavePermits] = useState<LeavePermitRecord[]>([]);
  const [userSettings, setUserSettings] = useState<UserSettings>(loadUserSettingsFromStorage());
  
  const location = useLocation();
  const [currentView, setCurrentView] = useState<AppView>(AppView.Dashboard);

  const isInitialPayslipsMount = useRef(true);
  const isInitialLeavePermitsMount = useRef(true);
  const isInitialUserSettingsMount = useRef(true);

  useEffect(() => {
    const path = location.pathname;
    const matchedEntry = pathToViewMap.find(item => item.pathCheck(path));
    if (matchedEntry) {
      setCurrentView(matchedEntry.view);
    } else {
      setCurrentView(AppView.Dashboard); // Default view if no specific match
    }
  }, [location.pathname]);


  // Load initial data from storage
  useEffect(() => {
    setPayslips(loadPayslipsFromStorage());
    setLeavePermits(loadLeavePermitsFromStorage());
    setUserSettings(loadUserSettingsFromStorage());
  }, []);

  // Save payslips to storage when they change
  useEffect(() => {
    if (isInitialPayslipsMount.current) {
      isInitialPayslipsMount.current = false;
    } else {
      savePayslipsToStorage(payslips);
    }
  }, [payslips]);

  // Save leave permits to storage when they change
  useEffect(() => {
    if (isInitialLeavePermitsMount.current) {
      isInitialLeavePermitsMount.current = false;
    } else {
      saveLeavePermitsToStorage(leavePermits);
    }
  }, [leavePermits]);

  // Save user settings to storage when they change
  useEffect(() => {
    if (isInitialUserSettingsMount.current) {
      isInitialUserSettingsMount.current = false;
    } else {
      saveUserSettingsToStorage(userSettings);
    }
  }, [userSettings]);


  const handleAddOrUpdatePayslip = useCallback((payslip: Payslip) => {
    setPayslips(currentPayslips => {
      const existingIndex = currentPayslips.findIndex(p => p.id === payslip.id);
      if (existingIndex > -1) {
        return currentPayslips.map(p => p.id === payslip.id ? payslip : p);
      } else {
        return [...currentPayslips, payslip].sort((a, b) => new Date(b.dateIssued).getTime() - new Date(a.dateIssued).getTime());
      }
    });
  }, []);

  const handleDeletePayslip = useCallback((idToDelete: string) => {
    setPayslips(currentPayslips => {
      const updatedPayslips = currentPayslips.filter(p => {
        if (!p || typeof p.id === 'undefined') {
          return false; 
        }
        return p.id !== idToDelete;
      });
      return updatedPayslips;
    });
  }, []); 
  
  const handleAddOrUpdateLeavePermit = useCallback((record: LeavePermitRecord) => {
    setLeavePermits(currentRecords => {
      const existingIndex = currentRecords.findIndex(r => r.id === record.id);
      if (existingIndex > -1) {
        return currentRecords.map(r => r.id === record.id ? record : r);
      } else {
        // Ensure date is valid for sorting, using fallback for different record types
        const getDateForSort = (rec: LeavePermitRecord) => new Date(rec.startDate || rec.date || 0).getTime();
        return [...currentRecords, record].sort((a,b) => getDateForSort(b) - getDateForSort(a));
      }
    });
  }, []);

  const handleDeleteLeavePermit = useCallback((id: string) => {
    setLeavePermits(currentRecords => currentRecords.filter(r => r.id !== id));
  }, []);

  const handleUpdateUserSettings = useCallback((settings: UserSettings) => {
    setUserSettings(settings);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<DashboardPage payslips={payslips} leavePermits={leavePermits} userSettings={userSettings} />} />
          <Route path="/payslips" element={<PayslipsPage payslips={payslips} onDeletePayslip={handleDeletePayslip} />} />
          <Route path="/payslips/new" element={<AddEditPayslipPage onSave={handleAddOrUpdatePayslip} payslips={payslips} />} />
          <Route path="/payslips/edit/:id" element={<AddEditPayslipPage payslips={payslips} onSave={handleAddOrUpdatePayslip} />} />
          <Route path="/payslips/view/:id" element={<ViewPayslipPage payslips={payslips} onUpdatePayslip={handleAddOrUpdatePayslip} />} />
          <Route path="/leave-permits" element={<LeavePermitManagementPage records={leavePermits} onSave={handleAddOrUpdateLeavePermit} onDelete={handleDeleteLeavePermit} />} />
          <Route path="/settings" element={<SettingsPage userSettings={userSettings} onSaveUserSettings={handleUpdateUserSettings}/>} />
        </Routes>
      </main>
      <footer className="bg-slate-800 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;