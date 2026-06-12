import React, { useState } from 'react';
import { FiSearch, FiLogOut } from 'react-icons/fi';
import StatsCard from '../components/marketing/StatsCard';
import HeadcountChart from '../components/marketing/HeadcountChart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const departmentData = [
  { name: 'Engineering', value: 82, color: '#0D5C7D' },
  { name: 'Marketing', value: 45, color: '#14B8A6' },
  { name: 'Sales', value: 58, color: '#0F766E' },
  { name: 'Design', value: 34, color: '#2DD4BF' },
  { name: 'Operations', value: 29, color: '#94A3B8' },
];

const DashboardPage = ({ user, onLogout }) => {
  const [showAlert, setShowAlert] = useState(true);

  const getInitials = (email) => {
    if (!email) return 'AD';
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex h-screen w-screen bg-[#F4F9FB] overflow-hidden font-sans">
      
      {/* Left Sidebar */}
      <aside className="w-60 bg-[#115e59] text-white flex flex-col justify-between flex-shrink-0 z-20 shadow-xl select-none">
        <div className="overflow-y-auto flex-1 py-6 px-4 space-y-6">
          {/* Header/Logo */}
          <div className="px-3 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2DD4BF] to-white flex items-center justify-center text-sm font-extrabold text-[#115e59] shadow-md">
              H
            </div>
            <span className="text-white text-lg font-black tracking-wider">HUMAI</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-5">
            {/* Main Section */}
            <div className="space-y-1">
              {[
                { name: 'Dashboard', active: true },
                { name: 'Employees' },
                { name: 'Recruitment' },
                { name: 'Attendance' },
                { name: 'Offboarding' },
                { name: 'Leave' },
              ].map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-150 cursor-pointer ${
                    item.active 
                      ? 'bg-white/10 text-white font-extrabold shadow-sm' 
                      : 'text-teal-100/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.active ? 'bg-[#2DD4BF]' : 'bg-teal-100/40'}`} />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            {/* Operations Section */}
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-extrabold text-teal-200/50 uppercase tracking-widest block mb-2">OPERATIONS</span>
              {[
                { name: 'Payroll' },
                { name: 'Performance' },
                { name: 'Templates' },
              ].map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wide text-teal-100/70 hover:text-white hover:bg-white/5 transition-all duration-150 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-100/40 shrink-0" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            {/* System Section */}
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-extrabold text-teal-200/50 uppercase tracking-widest block mb-2">SYSTEM</span>
              {[
                { name: 'Reports' },
                { name: 'Settings' },
              ].map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wide text-teal-100/70 hover:text-white hover:bg-white/5 transition-all duration-150 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-100/40 shrink-0" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            {/* Admin Section */}
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-extrabold text-teal-200/50 uppercase tracking-widest block mb-2">ADMIN</span>
              {[
                { name: 'Security Alerts' },
                { name: 'AI Usage Logs' },
              ].map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wide text-teal-100/70 hover:text-white hover:bg-white/5 transition-all duration-150 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-100/40 shrink-0" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* User Card Bottom */}
        <div className="p-4 border-t border-teal-800/40 bg-black/10 flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#2DD4BF] flex items-center justify-center text-xs font-extrabold text-[#115e59] shadow-inner uppercase shrink-0">
              {getInitials(user?.email)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Admin User</p>
              <p className="text-[10px] text-teal-200/60 font-semibold truncate mt-0.5">hr@company.com</p>
            </div>
          </div>
          <button className="text-teal-200 hover:text-white transition-colors cursor-pointer">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between flex-shrink-0 select-none">
          {/* Left: Breadcrumbs & Page Title */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-1 text-[10px] font-bold text-slate-400 tracking-wider">
              <span>HUMAI</span>
              <span>/</span>
              <span>DASHBOARD</span>
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">Dashboard</h1>
          </div>
          
          {/* Right: Search, Actions, Profile & Logout */}
          <div className="flex items-center space-x-4">
            {/* Search bar */}
            <div className="relative w-64">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-[#F4F9FB] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 transition-all duration-200"
              />
            </div>

            {/* Action Button 1 */}
            <button className="p-2 border border-slate-100 hover:bg-slate-50 text-slate-500 rounded-xl transition-all duration-150 cursor-pointer">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>

            {/* Action Button 2 */}
            <button className="p-2 border border-slate-100 hover:bg-slate-50 text-slate-500 rounded-full transition-all duration-150 cursor-pointer">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* User Profile avatar */}
            <div className="w-9 h-9 rounded-full bg-[#2DD4BF] flex items-center justify-center text-sm font-bold text-[#115e59] shadow-inner uppercase select-none">
              {getInitials(user?.email)}
            </div>

            {/* Logout button */}
            <button 
              onClick={onLogout}
              title="Sign Out"
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <FiLogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dashboard Main Content Scrollable Area */}
        <main className="flex-1 p-8 overflow-y-auto space-y-6">
          {/* Notification Alert Banner */}
          {showAlert && (
            <div className="bg-white border border-slate-100 px-6 py-4.5 rounded-2xl flex items-center justify-between text-xs font-semibold text-slate-700 animate-fade-in shadow-sm">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] shrink-0" />
                <span>You have <strong className="text-slate-900 font-bold">4 pending leave requests</strong> and <strong className="text-slate-900 font-bold">2 payroll corrections</strong> awaiting review.</span>
              </div>
              <div className="flex items-center space-x-3 shrink-0">
                <button 
                  onClick={() => alert('Reviewing requests...')}
                  className="bg-[#0B4F6C] hover:bg-[#0D5C7D] text-white px-5 py-2 rounded-full text-[10px] font-bold transition-all duration-150 active:scale-95 shadow-md shadow-[#0B4F6C]/10 cursor-pointer"
                >
                  Review Now
                </button>
                <button 
                  onClick={() => setShowAlert(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold px-2.5 py-2 rounded-xl text-[10px] transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard 
              title="Total Employees" 
              value="248" 
              change="+3 this month" 
              barHeights={[35, 45, 40, 50, 55, 60, 45, 80]}
              activeColor="#14B8A6"
            />
            <StatsCard 
              title="Active Employees" 
              value="231" 
              change="93.1% retention" 
              barHeights={[50, 55, 60, 58, 65, 70, 55, 82]}
              activeColor="#14B8A6"
            />
            <StatsCard 
              title="On Leave Today" 
              value="12" 
              change="4.8% of workforce" 
              barHeights={[20, 30, 25, 40, 35, 30, 20, 55]}
              activeColor="#14B8A6"
            />
            <StatsCard 
              title="Open Positions" 
              value="17" 
              change="5 pending interviews" 
              barHeights={[65, 55, 45, 35, 50, 60, 40, 75]}
              activeColor="#14B8A6"
            />
          </div>

          {/* Middle Grid: Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2">
              <HeadcountChart />
            </div>

            {/* Donut Chart: Dept. Distribution */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between select-none">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Dept. Distribution</h4>
                <button className="text-[10px] font-bold text-slate-400 border border-slate-100 hover:bg-slate-50 px-3 py-1 rounded-lg transition-colors cursor-pointer">
                  SEE ALL
                </button>
              </div>

              <div className="flex items-center justify-between flex-1 mt-4">
                {/* Legend list on the left */}
                <div className="flex-1 pr-4 space-y-3.5 text-xs font-semibold text-slate-600">
                  {departmentData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5 truncate">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="truncate text-slate-700 font-bold">{item.name}</span>
                      </div>
                      <span className="text-slate-400 font-extrabold ml-2">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Donut ring on the right */}
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
                    <span className="text-xl font-black text-slate-800 leading-none">248</span>
                    <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-wider">TOTAL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Recent Activity & Upcoming Events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between select-none">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recent Activity</h4>
                  <button className="text-[10px] font-bold text-slate-400 border border-slate-100 hover:bg-slate-50 px-3 py-1 rounded-lg transition-colors cursor-pointer">
                    SEE ALL
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { time: '09:32', text: 'New employee onboarded — Engineering' },
                    { time: '10:15', text: 'Leave request approved — Design' },
                    { time: '11:00', text: 'Performance review completed — Sales' },
                    { time: '13:45', text: 'Policy document updated — HR' },
                    { time: '14:22', text: 'Payroll cycle initiated — Finance' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 text-xs">
                      <span className="text-slate-400 font-semibold w-10 shrink-0">{item.time}</span>
                      <span className="text-slate-300">|</span>
                      <span className="text-slate-700 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* View all Button */}
              <button className="w-full mt-6 py-2 bg-white border border-slate-100 hover:bg-slate-50 hover:border-slate-200 text-slate-500 rounded-xl text-xs font-semibold text-center transition-all duration-150 cursor-pointer">
                View all
              </button>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm select-none">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Upcoming Events</h4>
                <button className="text-[10px] font-bold text-slate-400 border border-slate-100 hover:bg-slate-50 px-3 py-1 rounded-lg transition-colors cursor-pointer">
                  SEE ALL
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { date: 'Jun 5', text: 'Timesheet submission deadline' },
                  { date: 'Jun 10', text: 'Mid-year self-assessments due' },
                  { date: 'Jun 12', text: 'Payroll approval window' },
                  { date: 'Jun 15', text: 'Direct deposit processing' },
                  { date: 'Jun 20', text: 'Engineering calibration session' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 text-xs">
                    <span className="px-2.5 py-1 bg-[#14B8A6]/10 text-[#0F766E] font-bold rounded-lg shrink-0 w-[52px] text-center">
                      {item.date}
                    </span>
                    <span className="text-slate-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating AI Action Button */}
      <button className="fixed bottom-8 right-8 w-12 h-12 bg-[#0B4F6C] hover:bg-[#0D5C7D] text-white rounded-full flex items-center justify-center font-extrabold text-xs shadow-lg shadow-[#0B4F6C]/25 transition-all duration-200 hover:scale-105 active:scale-95 z-50 cursor-pointer">
        + AI
      </button>
    </div>
  );
};

export default DashboardPage;
