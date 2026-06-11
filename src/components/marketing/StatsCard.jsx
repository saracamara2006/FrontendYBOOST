import React from 'react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

const StatsCard = ({ title, value, change, isPositive, chartData, strokeColor = '#14B8A6' }) => {
  return (
    <div className="bg-white p-3 rounded-xl border border-slate-100 custom-shadow flex flex-col justify-between h-[82px] select-none hover:border-slate-200 transition-all duration-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <h4 className="text-lg font-bold text-slate-800 tracking-tight mt-0.5">{value}</h4>
        </div>
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
          isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {change}
        </span>
      </div>
      
      {/* Sparkline Container */}
      <div className="w-full h-[24px] mt-1.5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={strokeColor} 
              strokeWidth={1.5} 
              dot={false}
              isAnimationActive={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsCard;
