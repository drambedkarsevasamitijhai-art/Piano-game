/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX, Settings, Music, Sparkles } from 'lucide-react';
import { Language, GameMode } from '../types/game';
import { TRANSLATIONS } from '../utils/i18n';

interface TopBarProps {
  lang: Language;
  onToggleLang: () => void;
  gameMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenSettings: () => void;
  onOpenSongModal: () => void;
  currentSongTitle: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  lang,
  onToggleLang,
  gameMode,
  onSelectMode,
  isMuted,
  onToggleMute,
  onOpenSettings,
  onOpenSongModal,
  currentSongTitle
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="w-full max-w-5xl mx-auto px-4 py-3 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40 transition-colors">
      {/* Zone 1: Single text wordmark */}
      <div className="flex items-center gap-3">
        <a href="/" className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="w-2.5 h-6 bg-gradient-to-b from-sky-400 to-indigo-500 rounded-sm inline-block shadow-[0_0_12px_rgba(56,189,248,0.5)]"></span>
          <span>{lang === 'hi' ? 'पियानो रिदम' : 'Piano Rhythm'}</span>
        </a>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 pl-2 border-l border-slate-800">
          <Music className="w-3.5 h-3.5 text-sky-400" />
          <span className="truncate max-w-[160px] font-medium text-slate-300">{currentSongTitle}</span>
        </div>
      </div>

      {/* Zone 2: Navigation / Mode Segmented Controls */}
      <nav className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-lg">
        <button
          onClick={() => onSelectMode('song')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
            gameMode === 'song'
              ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.songMode}
        </button>
        <button
          onClick={() => onSelectMode('endless')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
            gameMode === 'endless'
              ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.endlessMode}
        </button>
        <button
          onClick={() => onSelectMode('zen')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
            gameMode === 'zen'
              ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.practiceMode}
        </button>
      </nav>

      {/* Zone 3: Interactive utility actions */}
      <div className="flex items-center gap-2">
        {gameMode === 'song' && (
          <button
            onClick={onOpenSongModal}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-sky-300 bg-sky-950/40 border border-sky-800/60 rounded-lg hover:bg-sky-900/50 transition-colors whitespace-nowrap cursor-pointer"
            title={t.changeSong}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.changeSong}</span>
          </button>
        )}

        <button
          onClick={onToggleLang}
          className="px-2.5 py-1.5 text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
          title="Switch Language (हिंदी / English)"
        >
          {lang === 'hi' ? 'EN' : 'हिन्दी'}
        </button>

        <button
          onClick={onToggleMute}
          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
            isMuted
              ? 'bg-rose-950/40 border-rose-800/80 text-rose-400'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
          }`}
          title={isMuted ? t.unmute : t.mute}
          aria-label={isMuted ? t.unmute : t.mute}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={onOpenSettings}
          className="p-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
          title={t.settings}
          aria-label={t.settings}
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
