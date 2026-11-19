/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Flame, Trophy } from 'lucide-react';
import { Language, GameMode } from '../types/game';
import { TRANSLATIONS } from '../utils/i18n';

interface ScoreDashboardProps {
  score: number;
  highScore: number;
  combo: number;
  multiplier: number;
  lang: Language;
  gameMode: GameMode;
  songProgress?: { current: number; total: number };
}

export const ScoreDashboard: React.FC<ScoreDashboardProps> = ({
  score,
  highScore,
  combo,
  multiplier,
  lang,
  gameMode,
  songProgress
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="w-full max-w-[360px] flex flex-col gap-1.5 mb-2 select-none">
      {/* Top row: Score, Combo & High Score */}
      <div className="flex items-center justify-between text-sm px-1">
        {/* Score */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-slate-400 font-medium">{t.score}:</span>
          <span className="text-2xl font-black text-sky-400 tracking-tight font-mono tabular-nums drop-shadow-xs">
            {score}
          </span>
        </div>

        {/* Combo Streak */}
        {combo > 1 && (
          <div className="flex items-center gap-1 text-xs font-bold text-amber-400 animate-bounce">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{combo} {t.combo}</span>
            {multiplier > 1 && (
              <span className="text-emerald-400 font-black">({multiplier}x)</span>
            )}
          </div>
        )}

        {/* High score */}
        <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
          <Trophy className="w-3 h-3 text-amber-400" />
          <span className="font-mono tabular-nums text-slate-300 font-semibold">{highScore}</span>
        </div>
      </div>

      {/* Song Progress bar if in Song mode */}
      {gameMode === 'song' && songProgress && songProgress.total > 0 && (
        <div className="w-full bg-slate-900 border border-slate-800 rounded-full h-2 overflow-hidden px-0.5 py-0.5">
          <div
            className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full rounded-full transition-all duration-200"
            style={{
              width: `${Math.min(100, Math.round((songProgress.current / songProgress.total) * 100))}%`
            }}
          />
        </div>
      )}

      {/* Keyboard reminder text */}
      <div className="flex justify-between items-center text-[11px] text-slate-400 px-1 font-medium">
        <span>{t.trackKeys}</span>
        {gameMode === 'song' && songProgress && (
          <span className="font-mono tabular-nums text-slate-400">
            {songProgress.current} / {songProgress.total} {t.notesCount}
          </span>
        )}
      </div>
    </div>
  );
};
