"use client";

import React, { useState } from 'react';

const ToolBar: React.FC = () => {
  const tabs = ['NPCS', 'Players', 'Objects', 'Music', 'Images', 'More'];
  const [activeTab, setActiveTab] = useState('NPCS');

  return (
    <div className="bg-[#8e8271] p-4 font-sans select-none border-t-2 border-[#5a5043] w-full">
      <div className="flex flex-col md:flex-row gap-8 items-start max-w-7xl mx-auto">
        
        {/* --- LEFT SECTION: Tabbed Asset Browser --- */}
        <div className="w-min bg-[#9c9081] rounded overflow-hidden border-2 border-black flex-shrink-0">
          
          {/* White Tab Header */}
          <div className="flex bg-white border-b border-black">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-3 py-2 text-[10px] font-bold transition-colors whitespace-nowrap
                  ${
                    activeTab === tab
                      ? 'text-[#6d5dfc] border-b-4 border-[#6d5dfc]'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tan Spacer Strip */}
          <div className="h-6 bg-[#8e8271]"></div>

          {/* Asset Grid (6x2) */}
          {/* Using table layout logic for the grid prevents sub-pixel gaps entirely */}
          <div className="inline-grid grid-cols-6 bg-black gap-[1px]">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 bg-[#d1d1d1] hover:bg-gray-400 cursor-pointer transition-colors flex-shrink-0 border"
              />
            ))}
          </div>
        </div>

        {/* --- RIGHT SECTION: Controls & Actions --- */}
        <div className="flex flex-col items-end gap-10 flex-grow ml-auto">
          
          {/* History Controls */}
          <div className="flex space-x-14">
            <button className="w-12 h-12 rounded-full bg-[#2d2d2d] hover:bg-black text-white text-[10px] font-bold uppercase flex items-center justify-center transition-all active:scale-95 shadow-lg border border-black/20">
              Back
            </button>
            <button className="w-12 h-12 rounded-full bg-[#2d2d2d] hover:bg-black text-white text-[10px] font-bold uppercase flex items-center justify-center transition-all active:scale-95 shadow-lg border border-black/20">
              Next
            </button>
          </div>


          {/* Action Buttons Stack */}
          <div className="flex flex-col gap-2 w-40">
            {['Select Folder', 'New', 'Save', 'Load'].map((label) => (
              <button 
                key={label}
                className="w-full px-4 py-2 rounded bg-[#2d2d2d] hover:bg-black text-white text-[11px] font-bold uppercase transition-colors shadow-md text-center border border-black/20"
              >
                {label}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ToolBar;