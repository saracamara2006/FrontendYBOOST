import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', count: 180 },
  { month: 'Feb', count: 195 },
  { month: 'Mar', count: 210 },
  { month: 'Apr', count: 205 },
  { month: 'May', count: 222 },
  { month: 'Jun', count: 230 },
  { month: 'Jul', count: 240 },
  { month: 'Aug', count: 248 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 text-[10px] text-white p-2 rounded-lg shadow-xl font-medium">
        <p className="text-slate-400 mb-0.5">{payload[0].payload.month}</p>
        <p className="text-[#14B8A6] font-bold">{payload[0].value} Employees</p>
      </div>
    );
  }
  return null;
};

const HeadcountChart = () => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 custom-shadow flex flex-col justify-between h-[180px] select-none">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Headcount Trend</h4>
          <p className="text-[9px] text-slate-400 mt-0.5">Overall growth since Q1</p>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
          <span className="text-[9px] font-medium text-slate-500">Active count</span>
        </div>
      </div>
      
      <div className="flex-1 w-full text-[9px] font-medium text-slate-400">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="headcountGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="month" 
              stroke="#94A3B8" 
              tickLine={false} 
              axisLine={false} 
              dy={6}
            />
            <YAxis 
              stroke="#94A3B8" 
              tickLine={false} 
              axisLine={false} 
              domain={[150, 260]}
              dx={-6}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="count" 
              stroke="#14B8A6" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#headcountGrad)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HeadcountChart;
