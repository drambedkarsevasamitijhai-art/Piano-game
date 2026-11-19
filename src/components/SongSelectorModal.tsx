/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Play, Music, Flame } from 'lucide-react';
import { Song, Language } from '../types/game';
import { SONGS_LIBRARY } from '../data/songs';
import { TRANSLATIONS } from '../utils/i18n';
import { soundEngine } from '../utils/audio';

interface SongSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSong: (song: Song) => void;
  currentSongId: string;
  lang: Language;
}

export const SongSelectorModal: React.FC<SongSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectSong,
  currentSongId,
  lang
}) => {
  const t = TRANSLATIONS[lang];

  if (!isOpen) return null;

  const handlePreview = (e: React.MouseEvent, song: Song) => {
    e.stopPropagation();
    // Play preview arpeggio notes
    song.notes.slice(0, 4).forEach((note, idx) => {
      setTimeout(() => {
        soundEngine.playPianoNote(note.pitch, 0.45, note.track);
      }, idx * 180);
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-white text-base">
              {t.selectSongToPlay}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Songs List */}
        <div className="p-4 overflow-y-auto space-y-2.5 divide-y divide-slate-800/40">
          {SONGS_LIBRARY.map((song) => {
            const isSelected = song.id === currentSongId;
            const diffColor =
              song.difficulty === 'easy'
                ? 'text-emerald-400'
                : song.difficulty === 'medium'
                ? 'text-amber-400'
                : 'text-rose-400';

            return (
              <div
                key={song.id}
                onClick={() => {
                  onSelectSong(song);
                  onClose();
                }}
                className={`pt-2.5 first:pt-0 p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-sky-950/40 border-sky-500/60 shadow-xs'
                    : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700'
                }`}
              >
                <div className="flex-1 min-w-0 pr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-sm text-white truncate">
                      {lang === 'hi' ? song.title.hi : song.title.en}
                    </h4>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${diffColor}`}>
                      {song.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 truncate mb-1">
                    {lang === 'hi' ? song.artist.hi : song.artist.en}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                    <span>{song.bpm} {t.bpm}</span>
                    <span aria-hidden="true">·</span>
                    <span>{song.notes.length} {t.notesCount}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handlePreview(e, song)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    title="Audio Preview"
                  >
                    <Play className="w-3.5 h-3.5 fill-sky-400" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectSong(song);
                      onClose();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-400 text-slate-950'
                        : 'bg-slate-800 text-slate-200 hover:bg-sky-500 hover:text-slate-950'
                    }`}
                  >
                    {isSelected ? (lang === 'hi' ? 'चयनित' : 'Active') : (lang === 'hi' ? 'बजाएं' : 'Play')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/40 text-xs text-slate-400 flex items-center justify-between">
          <span>{SONGS_LIBRARY.length} {lang === 'hi' ? 'धुनें उपलब्ध' : 'Melodies Available'}</span>
          <span className="flex items-center gap-1 text-sky-400">
            <Flame className="w-3.5 h-3.5" />
            {lang === 'hi' ? 'लयबद्ध पियानो' : 'Rhythm Piano'}
          </span>
        </div>
      </div>
    </div>
  );
};
