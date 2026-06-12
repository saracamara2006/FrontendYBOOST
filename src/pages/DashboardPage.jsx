import React, { useState } from 'react';
import { 
  FiGrid, 
  FiUsers, 
  FiBriefcase, 
  FiClock, 
  FiCreditCard, 
  FiTrendingUp, 
  FiPieChart, 
  FiSettings,
  FiSearch,
  FiBell,
  FiLogOut
} from 'react-icons/fi';
import StatsCard from '../components/marketing/StatsCard';
import HeadcountChart from '../components/marketing/HeadcountChart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const departmentData = [
  { name: 'Engineering', value: 82, color: '#0D5C7D' },
  { name: 'Marketing', value: 45, color: '#14B8A6' },
  { name: 'Sales', value: 58, color: '#F59E0B' },
  { name: 'Design', value: 34, color: '#6366F1' },
];

const totalEmployeesData = [{ value: 235 }, { value: 238 }, { value: 240 }, { value: 242 }, { value: 245 }, { value: 248 }];
const activeEmployeesData = [{ value: 220 }, { value: 224 }, { value: 228 }, { value: 225 }, { value: 229 }, { value: 231 }];
const openPositionsData = [{ value: 25 }, { value: 22 }, { value: 20 }, { value: 18 }, { value: 19 }, { value: 17 }];

const DashboardPage = ({ user, onLogout }) => {
  const [showAlert, setShowAlert] = useState(true);
  
  const menuItems = [
    { name: 'Dashboard', icon: FiGrid, active: true },
    { name: 'Employees', icon: FiUsers },
    { name: 'Recruitment', icon: FiBriefcase },
    { name: 'Attendance', icon: FiClock },
    { name: 'Payroll', icon: FiCreditCard },
    { name: 'Performance', icon: FiTrendingUp },
    { name: 'Reports', icon: FiPieChart },
    { name: 'Settings', icon: FiSettings },
  ];

  const getInitials = (email) => {
    if (!email) return 'AD';
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex h-screen w-screen bg-[#F4F9FB] overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B4F6C] text-white flex flex-col justify-between flex-shrink-0 z-20 shadow-xl shadow-[#0B4F6C]/10">
        <div>
          {/* Header */}
          <div className="p-6 flex items-center space-x-3 select-none">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#14B8A6] to-white flex items-center justify-center text-sm font-extrabold text-[#0B4F6C] shadow-md">
              H
            </div>
            <span className="text-white text-lg font-extrabold tracking-wider">HUMAI</span>
          </div>

          {/* Nav Links */}
          <nav className="px-4 space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    item.active 
                      ? 'bg-white/10 text-white font-bold' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.active ? 'text-[#14B8A6]' : 'text-slate-300'}`} />
                  <span className="flex-1 text-left flex items-center gap-2">
                    {item.active && <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />}
                    {item.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile bottom section */}
        <div className="p-4 border-t border-white/10 bg-black/10 flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-extrabold text-white shadow-inner uppercase shrink-0">
              {getInitials(user?.email)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate capitalize">
                {user?.email?.split('@')[0] || 'Admin'}
              </p>
              <p className="text-[10px] text-slate-300 font-medium truncate capitalize">
                {user?.role || 'HR Manager'}
              </p>
            </div>
          </div>
          
          <button 
            onClick={onLogout}
            title="Sign Out"
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer"
          >
            <FiLogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between flex-shrink-0">
          <h1 className="text-lg font-extrabold text-slate-800 select-none">Dashboard</h1>
          
          <div className="flex items-center space-x-6">
            {/* Search */}
            <div className="relative w-64">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-1.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D5C7D]/15 focus:border-[#0D5C7D] transition-all duration-200"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer bg-slate-50 hover:bg-slate-100 rounded-xl">
              <FiBell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#14B8A6] rounded-full border border-white" />
            </button>

            {/* Profile Avatar */}
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white shadow-sm border border-emerald-400 select-none">
              {getInitials(user?.email)}
            </div>
          </div>
        </header>

        {/* Dashboard Panels Scrollable content */}
        <main className="flex-1 p-8 overflow-y-auto space-y-6">
          {/* Notification Alert Banner */}
          {showAlert && (
            <div className="bg-[#0D5C7D]/5 border border-[#0D5C7D]/10 px-4 py-3.5 rounded-2xl flex items-center justify-between text-xs font-semibold text-[#0D5C7D] animate-fade-in shadow-sm">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] animate-pulse shrink-0 shadow-md shadow-[#14B8A6]/20" />
                <span>You have <strong className="text-[#0D5C7D] font-bold">4 pending leave requests</strong> awaiting review.</span>
              </div>
              <div className="flex items-center space-x-3 shrink-0">
                <button 
                  onClick={() => alert('Reviewing requests...')}
                  className="bg-[#0D5C7D] hover:bg-[#0F3D5E] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95 shadow-md shadow-[#0D5C7D]/10 cursor-pointer"
                >
                  Review
                </button>
                <button 
                  onClick={() => setShowAlert(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold px-2 py-1.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard 
              title="Total Employees" 
              value="248" 
              change="+3 this month" 
              isPositive={true} 
              chartData={totalEmployeesData} 
              strokeColor="#0D5C7D"
            />
            <StatsCard 
              title="Active Employees" 
              value="231" 
              change="93.1% retention" 
              isPositive={true} 
              chartData={activeEmployeesData} 
              strokeColor="#14B8A6"
            />
            <StatsCard 
              title="Open Positions" 
              value="17" 
              change="5 pending" 
              isPositive={true} 
              chartData={openPositionsData} 
              strokeColor="#F59E0B"
            />
          </div>

          {/* Lower Grid: Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Area Chart: Headcount Trend (span 2 cols) */}
            <div className="lg:col-span-2">
              <HeadcountChart />
            </div>

            {/* Donut Chart: Departments (span 1 col) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between select-none">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Departments</h4>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">Active team distribution</p>
              </div>

              <div className="flex items-center justify-between flex-1 mt-6">
                {/* Donut ring */}
                <div className="w-28 h-28 relative flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={36}
                        outerRadius={48}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-lg font-black text-slate-800 leading-none">248</span>
                    <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Total</span>
                  </div>
                </div>

                {/* Legend list */}
                <div className="flex-1 pl-6 space-y-2.5 text-xs font-semibold text-slate-600">
                  {departmentData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 truncate">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="truncate text-slate-700 font-bold">{item.name}</span>
                      </div>
                      <span className="text-slate-400 font-extrabold ml-2">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
