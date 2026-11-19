/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ControlsProps {
  onInput: (trackIndex: number) => void;
  activeTracks: boolean[];
}

const KEYS_CONFIG = [
  { track: 0, label: '1', keyName: 'D', noteHint: 'C / Do' },
  { track: 1, label: '2', keyName: 'F', noteHint: 'D / Re' },
  { track: 2, label: '3', keyName: 'J', noteHint: 'E / Ga' },
  { track: 3, label: '4', keyName: 'K', noteHint: 'G / Pa' }
];

export const Controls: React.FC<ControlsProps> = ({ onInput, activeTracks }) => {
  return (
    <div className="flex w-full max-w-[360px] gap-2.5 mt-3 px-1 select-none">
      {KEYS_CONFIG.map(({ track, label, keyName, noteHint }) => {
        const isActive = activeTracks[track];
        return (
          <button
            key={track}
            id={`btn-${track}`}
            type="button"
            onPointerDown={(e) => {
              e.preventDefault();
              onInput(track);
            }}
            className={`flex-1 relative flex flex-col items-center justify-center py-3.5 px-2 rounded-xl transition-all duration-75 select-none touch-manipulation cursor-pointer border shadow-lg ${
              isActive
                ? 'bg-gradient-to-t from-sky-400 to-sky-300 border-white text-slate-950 scale-95 shadow-[0_0_20px_rgba(56,189,248,0.7)] translate-y-0.5'
                : 'bg-gradient-to-b from-slate-800 to-slate-900/90 border-slate-700/80 text-white hover:border-sky-500/60 active:scale-95 shadow-slate-950/60'
            }`}
          >
            {/* Top key cap styling resembling piano hammer */}
            <div className="flex items-baseline gap-1">
              <span className={`text-lg font-black tracking-tight leading-none ${isActive ? 'text-slate-950' : 'text-sky-300'}`}>
                {label}
              </span>
              <span className={`text-xs font-bold leading-none ${isActive ? 'text-slate-900 font-extrabold' : 'text-slate-300'}`}>
                ({keyName})
              </span>
            </div>

            <span className={`text-[10px] mt-1 tracking-wider uppercase font-medium ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
              {noteHint}
            </span>

            {/* Glowing key base bar */}
            <div
              className={`w-8 h-1 rounded-full mt-1.5 transition-colors ${
                isActive ? 'bg-slate-950' : 'bg-sky-500/40 group-hover:bg-sky-400'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
