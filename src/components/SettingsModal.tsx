/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Volume2, Lightbulb, Keyboard, Globe } from 'lucide-react';
import { Language, Difficulty } from '../types/game';
import { TRANSLATIONS } from '../utils/i18n';
import { soundEngine } from '../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onToggleLang: () => void;
  difficulty: Difficulty;
  onSetDifficulty: (diff: Difficulty) => void;
  showHints: boolean;
  onToggleHints: () => void;
  volume: number;
  onSetVolume: (vol: number) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  lang,
  onToggleLang,
  difficulty,
  onSetDifficulty,
  showHints,
  onToggleHints,
  volume,
  onSetVolume
}) => {
  const t = TRANSLATIONS[lang];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/60">
          <h3 className="font-bold text-white text-base">
            {t.settings}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Master Volume */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-sky-400" />
                {t.volume}
              </span>
              <span className="text-xs font-mono tabular-nums text-slate-400">
                {Math.round(volume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                onSetVolume(val);
                soundEngine.setVolume(val);
              }}
              className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-850 rounded-lg"
            />
          </div>

          {/* Language Switch */}
          <div className="flex items-center justify-between py-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-400" />
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  {lang === 'hi' ? 'भाषा (Language)' : 'Language (भाषा)'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {lang === 'hi' ? 'हिंदी और अंग्रेजी' : 'Hindi & English'}
                </div>
              </div>
            </div>
            <button
              onClick={onToggleLang}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-sky-300 rounded-lg transition-colors border border-slate-700 cursor-pointer"
            >
              {lang === 'hi' ? 'English में बदलें' : 'हिंदी में बदलें'}
            </button>
          </div>

          {/* Real-time Hint Toggle */}
          <div className="flex items-center justify-between py-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  {t.hintsEnabled}
                </div>
                <div className="text-[11px] text-slate-400 max-w-[220px]">
                  {t.hintsDesc}
                </div>
              </div>
            </div>
            <button
              onClick={onToggleHints}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                showHints ? 'bg-sky-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  showHints ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Difficulty Preset */}
          <div className="py-2 border-t border-slate-800/80">
            <span className="text-xs font-semibold text-slate-300 block mb-2">
              {t.difficulty}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['easy', 'normal', 'hard'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => onSetDifficulty(d)}
                  className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all capitalize cursor-pointer ${
                    difficulty === d
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-xs'
                      : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {t[d]}
                </button>
              ))}
            </div>
          </div>

          {/* Keyboard Layout Guide */}
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1">
              <Keyboard className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.desktopControls}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
              <div className="p-1 bg-slate-900 border border-slate-800 rounded text-sky-300">D / 1</div>
              <div className="p-1 bg-slate-900 border border-slate-800 rounded text-sky-300">F / 2</div>
              <div className="p-1 bg-slate-900 border border-slate-800 rounded text-sky-300">J / 3</div>
              <div className="p-1 bg-slate-900 border border-slate-800 rounded text-sky-300">K / 4</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            {lang === 'hi' ? 'पूर्ण' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
