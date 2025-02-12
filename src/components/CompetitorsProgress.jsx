import React from "react";

const CompetitorsProgress = ({ competitors }) => {
  return (
    <div className="mb-8 w-full max-w-xl mx-auto">
      {competitors.map((competitor) => (
        <div key={competitor.name} className="mb-4">
          <div className="flex justify-between text-sm text-neutral-400 mb-1">
            <span>{competitor.name}</span>
            <span>{competitor.wpm} WPM {competitor.accuracy}% ACC</span>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${competitor.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompetitorsProgress;