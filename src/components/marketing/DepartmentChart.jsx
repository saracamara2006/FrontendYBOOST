import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Engineering', value: 104, color: '#0D5C7D' },
  { name: 'Sales', value: 58, color: '#F59E0B' },
  { name: 'Marketing', value: 46, color: '#14B8A6' },
  { name: 'Design', value: 23, color: '#6366F1' },
];

const DepartmentChart = () => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 custom-shadow flex flex-col justify-between h-[180px] select-none">
      <div>
        <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Departments</h4>
        <p className="text-[9px] text-slate-400 mt-0.5">Active team distribution</p>
      </div>

      <div className="flex items-center justify-between flex-1 mt-1">
        {/* Pie/Donut Chart */}
        <div className="w-[85px] h-[85px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={28}
                outerRadius={38}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs font-extrabold text-slate-800 leading-none">231</span>
            <span className="text-[7px] font-semibold text-slate-400 mt-0.5 uppercase">Staff</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 pl-4 space-y-1.5 text-[9px] font-semibold text-slate-600">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate text-slate-700">{item.name}</span>
              </div>
              <span className="text-slate-400 font-bold ml-2">
                {Math.round((item.value / 231) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentChart;
