/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Sparkles, Star, Music, Award } from 'lucide-react';
import { GameState, Language, GameStats, Song } from '../types/game';
import { TRANSLATIONS } from '../utils/i18n';

interface GameOverModalProps {
  gameState: GameState;
  onStart: () => void;
  onSelectSong: () => void;
  lang: Language;
  stats: GameStats;
  gameOverReason: string;
  currentSong?: Song;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  gameState,
  onStart,
  onSelectSong,
  lang,
  stats,
  gameOverReason,
  currentSong
}) => {
  const t = TRANSLATIONS[lang];

  // Fire celebratory confetti on victory
  useEffect(() => {
    if (gameState === 'VICTORY') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [gameState]);

  if (gameState === 'PLAYING') return null;

  const isVictory = gameState === 'VICTORY';
  const isGameOver = gameState === 'GAME_OVER';
  const isMenu = gameState === 'MENU';

  // Calculate stars earned (0 to 3)
  let stars = 0;
  if (isVictory) {
    if (stats.accuracy >= 90) stars = 3;
    else if (stats.accuracy >= 70) stars = 2;
    else stars = 1;
  }

  return (
    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6 text-center select-none animate-in fade-in duration-200">
      {/* Decorative aura */}
      <div className="absolute w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Title & Icons */}
      {isMenu && (
        <>
          <div className="w-16 h-16 mb-3 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-sky-500/30">
            <Music className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mb-1">
            {t.appTitle}
          </h2>
          <p className="text-xs text-slate-400 mb-4 font-medium">
            {t.appSubtitle}
          </p>

          {currentSong && (
            <div className="w-full max-w-[280px] bg-slate-900/80 border border-slate-800 rounded-xl p-3 mb-4 text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400 block mb-0.5">
                {t.songMode}
              </span>
              <h4 className="text-sm font-bold text-white truncate">
                {lang === 'hi' ? currentSong.title.hi : currentSong.title.en}
              </h4>
              <p className="text-xs text-slate-400">
                {lang === 'hi' ? currentSong.artist.hi : currentSong.artist.en}
              </p>
            </div>
          )}

          <p className="text-xs text-slate-300 max-w-[300px] mb-6 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
            {t.rulesDesc}
          </p>

          <button
            onClick={onStart}
            className="w-full max-w-[260px] py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>{lang === 'hi' ? 'गेम शुरू करें' : 'Start Game'}</span>
          </button>
        </>
      )}

      {isGameOver && (
        <>
          <div className="w-14 h-14 mb-3 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <span className="text-2xl">💔</span>
          </div>
          <h2 className="text-2xl font-black text-rose-400 tracking-tight mb-2">
            {t.gameOver}
          </h2>
          <p className="text-sm text-slate-300 max-w-[280px] mb-4 font-medium leading-snug">
            {gameOverReason}
          </p>

          {/* Stats Breakdown Box */}
          <div className="w-full max-w-[280px] bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 mb-5 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">{t.finalScore}</span>
              <span className="text-lg font-bold font-mono text-sky-400 tabular-nums">
                {stats.score}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">{t.maxCombo}</span>
              <span className="font-bold font-mono text-amber-400 tabular-nums">
                {stats.maxCombo}x
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">{t.accuracy}</span>
              <span className="font-bold font-mono text-emerald-400 tabular-nums">
                {stats.accuracy}%
              </span>
            </div>
          </div>

          <div className="flex flex-col w-full max-w-[260px] gap-2">
            <button
              onClick={onStart}
              className="w-full py-3 px-6 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.playAgain}</span>
            </button>
            <button
              onClick={onSelectSong}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              {t.changeSong}
            </button>
          </div>
        </>
      )}

      {isVictory && (
        <>
          <div className="w-16 h-16 mb-2 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-xl shadow-amber-500/20">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-amber-300 tracking-tight mb-1">
            {t.victory}
          </h2>
          <p className="text-xs text-slate-300 mb-3">
            {currentSong ? (lang === 'hi' ? currentSong.title.hi : currentSong.title.en) : ''}
          </p>

          {/* Stars Earned */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3].map((starIdx) => (
              <Star
                key={starIdx}
                className={`w-7 h-7 transition-all ${
                  starIdx <= stars
                    ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                    : 'text-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Stats Box */}
          <div className="w-full max-w-[280px] bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 mb-5 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">{t.finalScore}</span>
              <span className="text-lg font-bold font-mono text-sky-400 tabular-nums">
                {stats.score}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">{t.accuracy}</span>
              <span className="font-bold font-mono text-emerald-400 tabular-nums">
                {stats.accuracy}%
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">{t.maxCombo}</span>
              <span className="font-bold font-mono text-amber-400 tabular-nums">
                {stats.maxCombo}x
              </span>
            </div>
          </div>

          <div className="flex flex-col w-full max-w-[260px] gap-2">
            <button
              onClick={onSelectSong}
              className="w-full py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'hi' ? 'अगली धुन चुनें' : 'Choose Next Song'}</span>
            </button>
            <button
              onClick={onStart}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              {t.playAgain}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
