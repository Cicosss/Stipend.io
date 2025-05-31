export interface PayslipItem {
  id: string;
  description: string;
  amount: number;
  category: 'income' | 'deduction' | 'informational' | 'contribution';
  isTaxable?: boolean;
  isTFRBase?: boolean;
  isExtraToExplain?: boolean; // User flags for AI explanation
  aiExplanation?: string;
  aiGroundingSources?: GroundingSource[];
}

export interface GroundingSource {
  web?: {
    uri?: string;
    title?: string;
  };
  // Add other source types if needed
}

export interface Payslip {
  id: string;
  month: number; // 1-12
  year: number;
  dateIssued: string; // ISO date string YYYY-MM-DD
  companyName: string;
  workerLevel?: string; 
  contractType?: string; 
  grossSalary: number;
  netSalary: number;
  items: PayslipItem[];
  holidaysTakenThisPeriod?: number;
  permitsTakenHoursThisPeriod?: number;
  notes?: string;
  pdfTextContent?: string; 
}

export interface LeavePermitRecord {
  id: string;
  type: 'holiday' | 'sick' | 'permit'; 
  startDate?: string; 
  endDate?: string; 
  date?: string; 
  days?: number; 
  hours?: number; 
  description: string;
  isVerified?: boolean; 
  associatedPayslipId?: string; 
}

export interface AIInteractionStatus {
  loading: boolean;
  error?: string;
}

export enum AppView {
  Dashboard = 'DASHBOARD',
  PayslipList = 'PAYSLIP_LIST',
  AddPayslip = 'ADD_PAYSLIP',
  ViewPayslip = 'VIEW_PAYSLIP',
  LeavePermitManagement = 'LEAVE_PERMIT_MANAGEMENT',
  Settings = 'SETTINGS',
}

export interface AIParsedPayslipData {
  companyName?: string;
  month?: number; // 1-12
  year?: number;
  dateIssued?: string; // "YYYY-MM-DD"
  grossSalary?: number;
  netSalary?: number;
  workerLevel?: string; 
  contractType?: string; 
  items?: Array<{
    description: string;
    amount: number;
    category?: 'income' | 'deduction' | 'contribution' | 'informational'; 
  }>;
}

export interface UserSettings {
  knownTFRAmount?: number;
  knownTFRDate?: string; // YYYY-MM-DD
  // Future settings can be added here
}
