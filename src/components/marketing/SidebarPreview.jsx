import React from 'react';
import { 
  FiGrid, 
  FiUsers, 
  FiBriefcase, 
  FiClock, 
  FiCreditCard, 
  FiTrendingUp, 
  FiPieChart, 
  FiSettings 
} from 'react-icons/fi';

const SidebarPreview = () => {
  const menuItems = [
    { name: 'Dashboard', icon: FiGrid, active: true },
    { name: 'Employees', icon: FiUsers, active: false },
    { name: 'Recruitment', icon: FiBriefcase, active: false },
    { name: 'Attendance', icon: FiClock, active: false },
    { name: 'Payroll', icon: FiCreditCard, active: false },
    { name: 'Performance', icon: FiTrendingUp, active: false },
    { name: 'Reports', icon: FiPieChart, active: false },
    { name: 'Settings', icon: FiSettings, active: false }
  ];

  return (
    <aside className="w-[180px] bg-slate-900 border-r border-slate-800 p-4 flex flex-col h-full select-none">
      <div className="flex items-center space-x-2 px-2 mb-6">
        <div className="w-5 h-5 rounded bg-gradient-to-tr from-[#14B8A6] to-[#0D5C7D] flex items-center justify-center text-[10px] font-bold text-white">
          H
        </div>
        <span className="text-white text-xs font-bold tracking-wider">HUMAI</span>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-150 cursor-pointer ${
                item.active 
                  ? 'bg-slate-800 text-white shadow-sm shadow-[#14B8A6]/10' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${item.active ? 'text-[#14B8A6]' : 'text-slate-400'}`} />
              <span>{item.name}</span>
            </div>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-slate-800 flex items-center space-x-2 px-1">
        <div className="w-6 h-6 rounded-full bg-slate-700 flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-[10px] font-semibold text-slate-200 truncate">Sarah Connor</p>
          <p className="text-[8px] text-slate-500 truncate">HR Admin</p>
        </div>
      </div>
    </aside>
  );
};

export default SidebarPreview;
