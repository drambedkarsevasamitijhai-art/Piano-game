/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Lightbulb } from 'lucide-react';
import { ActiveTile, Language } from '../types/game';
import { TRANSLATIONS } from '../utils/i18n';

interface HintBannerProps {
  tiles: ActiveTile[];
  isPlaying: boolean;
  isGameOver: boolean;
  lang: Language;
  showHints: boolean;
}

const KEY_NAMES = ['D', 'F', 'J', 'K'];

export const HintBanner: React.FC<HintBannerProps> = ({
  tiles,
  isPlaying,
  isGameOver,
  lang,
  showHints
}) => {
  const t = TRANSLATIONS[lang];

  if (!showHints) return null;

  let hintContent: React.ReactNode = null;

  if (isGameOver) {
    hintContent = (
      <span className="text-rose-400 font-semibold">
        {lang === 'hi' ? '❌ गेम समाप्त! दोबारा शुरू करें' : '❌ Game Over! Restart to try again'}
      </span>
    );
  } else if (!isPlaying) {
    hintContent = (
      <span className="text-amber-300 font-medium">
        {t.pressStartHint}
      </span>
    );
  } else if (tiles.length > 0) {
    const targetTile = tiles[0];
    const buttonNum = targetTile.track + 1;
    const keyLetter = KEY_NAMES[targetTile.track];

    hintContent = (
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        <span>{t.hintPrefix}</span>
        <span>{t.pressButton}</span>
        <span className="px-2 py-0.5 bg-sky-400 text-slate-950 font-black rounded-md text-sm shadow-xs">
          {buttonNum} ({keyLetter})
        </span>
        <span className="text-slate-400 text-xs">[{targetTile.noteName}]</span>
      </div>
    );
  } else {
    hintContent = (
      <span className="text-slate-400 font-medium">
        {t.waitForTile}
      </span>
    );
  }

  return (
    <div className="w-full max-w-[360px] bg-slate-900/90 border border-slate-700/80 px-3.5 py-2.5 rounded-xl text-center text-sm font-semibold text-amber-300 shadow-md mb-2 flex items-center justify-center gap-2">
      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
      <div className="leading-tight">{hintContent}</div>
    </div>
  );
};
