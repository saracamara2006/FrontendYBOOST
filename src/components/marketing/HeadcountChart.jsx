import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', count: 150 },
  { month: 'Feb', count: 190 },
  { month: 'Mar', count: 180 },
  { month: 'Apr', count: 220 },
  { month: 'May', count: 250 },
  { month: 'Jun', count: 270 },
  { month: 'Jul', count: 280 },
  { month: 'Aug', count: null },
  { month: 'Sep', count: null },
  { month: 'Oct', count: null },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length && payload[0].value !== null) {
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
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-[320px] select-none">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Headcount Trend</h4>
        </div>
        <button className="text-[10px] font-bold text-slate-400 border border-slate-100 hover:bg-slate-50 px-3 py-1 rounded-lg transition-colors cursor-pointer">
          SEE ALL
        </button>
      </div>
      
      <div className="flex-1 w-full text-[10px] font-semibold text-slate-400">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="headcountGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="month" 
              stroke="#94A3B8" 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#94A3B8" 
              tickLine={false} 
              axisLine={false} 
              domain={[100, 300]}
              ticks={[100, 150, 200, 250, 300]}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="count" 
              stroke="#14B8A6" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#headcountGrad)" 
              dot={{ stroke: '#14B8A6', strokeWidth: 2, fill: '#fff', r: 4 }}
              activeDot={{ stroke: '#14B8A6', strokeWidth: 2, fill: '#fff', r: 6 }}
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HeadcountChart;

