/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { soundEngine } from '../utils/audio';

interface PianoVisualizerProps {
  activeTracks: boolean[];
}

export const PianoVisualizer: React.FC<PianoVisualizerProps> = ({ activeTracks }) => {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    let animId: number;
    const update = () => {
      const currentLevel = soundEngine.getAudioLevel();
      setLevel(currentLevel);
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="hidden lg:flex flex-col items-center gap-2 p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl max-w-[180px] text-center select-none">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        Acoustic Resonator
      </span>

      {/* Audio Reactive Waves */}
      <div className="flex items-end justify-center gap-1 h-8 w-full px-2">
        {[0.4, 0.8, 1.2, 0.9, 1.4, 1.1, 0.7, 1.3].map((mult, idx) => {
          const height = Math.min(100, Math.max(12, level * mult * 350));
          return (
            <div
              key={idx}
              className="flex-1 bg-gradient-to-t from-sky-500 to-indigo-400 rounded-full transition-all duration-75"
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>

      {/* 4 Mini Track Indicators */}
      <div className="grid grid-cols-4 gap-1.5 w-full mt-1">
        {['D', 'F', 'J', 'K'].map((k, i) => (
          <div
            key={k}
            className={`py-1 text-[10px] font-mono font-bold rounded border transition-colors ${
              activeTracks[i]
                ? 'bg-sky-400 text-slate-950 border-white'
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            {k}
          </div>
        ))}
      </div>
    </div>
  );
};
