import React from 'react';

const StatsCard = ({ title, value, change, barHeights, activeColor = '#14B8A6' }) => {
  // Default heights if not provided
  const heights = barHeights || [30, 40, 35, 50, 45, 55, 40, 75];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-[155px] select-none hover:border-slate-200 transition-all duration-200">
      <div className="flex flex-col">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <h4 className="text-3xl font-black text-slate-800 tracking-tight mt-1">{value}</h4>
        <p className="text-xs text-slate-400 font-semibold mt-0.5">{change}</p>
      </div>
      
      {/* Mini Bar Chart */}
      <div className="flex items-end justify-between h-8 mt-4 px-1">
        {heights.map((height, idx) => {
          const isLast = idx === heights.length - 1;
          return (
            <div
              key={idx}
              className="w-[8%] rounded-t-sm"
              style={{
                height: `${height}%`,
                backgroundColor: isLast ? activeColor : `${activeColor}20`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StatsCard;

