import React, { useState } from 'react';
import SidebarPreview from './SidebarPreview';
import StatsCard from './StatsCard';
import HeadcountChart from './HeadcountChart';
import DepartmentChart from './DepartmentChart';
import { FiSearch, FiBell } from 'react-icons/fi';

const DashboardPreview = () => {
  const [showAlert, setShowAlert] = useState(true);

  // Sparkline data
  const totalEmployeesData = [
    { value: 235 }, { value: 238 }, { value: 240 }, 
    { value: 242 }, { value: 245 }, { value: 248 }
  ];
  const activeEmployeesData = [
    { value: 220 }, { value: 224 }, { value: 228 }, 
    { value: 225 }, { value: 229 }, { value: 231 }
  ];
  const openPositionsData = [
    { value: 25 }, { value: 22 }, { value: 20 }, 
    { value: 18 }, { value: 19 }, { value: 17 }
  ];

  return (
    <div className="w-full max-w-[760px] mx-auto bg-white rounded-2xl border border-slate-100 dashboard-shadow overflow-hidden flex flex-col h-[480px] animate-fade-in-up">
      {/* Browser Bar */}
      <div className="bg-slate-50 border-b border-slate-100 px-4 py-2 flex items-center space-x-2">
        <div className="flex space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex-1 max-w-[400px] mx-auto bg-slate-200/50 rounded-md py-0.5 text-[9px] text-center text-slate-400 font-medium select-none truncate">
          admin.humai-hr.com/dashboard
        </div>
      </div>

      {/* Main App Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SidebarPreview />

        {/* Dashboard Content */}
        <main className="flex-1 bg-[#F8FAFC] p-4 overflow-y-auto flex flex-col space-y-4">
          
          {/* Header */}
          <header className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div className="relative w-44">
              <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                disabled
                className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1 text-[10px] text-slate-700 placeholder-slate-400 focus:outline-none select-none cursor-default"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="relative p-1 text-slate-400 hover:text-slate-600 transition-colors">
                <FiBell className="w-3.5 h-3.5" />
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#14B8A6] rounded-full" />
              </button>
              <div className="w-5.5 h-5.5 rounded-full bg-gradient-to-tr from-[#0D5C7D] to-[#14B8A6] border border-white flex items-center justify-center text-[9px] font-bold text-white shadow-sm select-none">
                SC
              </div>
            </div>
          </header>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-3 gap-3">
            <StatsCard 
              title="Total Employees" 
              value="248" 
              change="+3.2%" 
              isPositive={true} 
              chartData={totalEmployeesData} 
              strokeColor="#0D5C7D"
            />
            <StatsCard 
              title="Active Employees" 
              value="231" 
              change="+2.1%" 
              isPositive={true} 
              chartData={activeEmployeesData} 
              strokeColor="#14B8A6"
            />
            <StatsCard 
              title="Open Positions" 
              value="17" 
              change="-12.5%" 
              isPositive={false} 
              chartData={openPositionsData} 
              strokeColor="#F59E0B"
            />
          </div>

          {/* Alert Banner */}
          {showAlert && (
            <div className="bg-[#0F3D5E]/5 border border-[#0F3D5E]/10 px-3 py-2 rounded-xl flex items-center justify-between text-[10px] font-medium text-[#0F3D5E] transition-all duration-300">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse" />
                <span>You have <strong>4 pending leave requests</strong> awaiting review.</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => alert('Reviewing requests...')}
                  className="bg-[#0D5C7D] hover:bg-[#0F3D5E] text-white px-2 py-0.5 rounded-md text-[9px] font-semibold transition-all duration-150 active:scale-95"
                >
                  Review
                </button>
                <button 
                  onClick={() => setShowAlert(false)}
                  className="text-slate-400 hover:text-slate-600 px-1 py-0.5 rounded text-[9px] transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HeadcountChart />
            <DepartmentChart />
          </div>

        </main>
      </div>
    </div>
  );
};

export default DashboardPreview;
