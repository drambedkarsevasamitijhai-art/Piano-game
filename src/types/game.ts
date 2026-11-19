/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GameState = 'MENU' | 'PLAYING' | 'PAUSED' | 'GAME_OVER' | 'VICTORY';

export type GameMode = 'song' | 'endless' | 'zen';

export type Difficulty = 'easy' | 'normal' | 'hard';

export type Language = 'hi' | 'en';

export type JudgementType = 'PERFECT' | 'GREAT' | 'GOOD' | 'MISS';

export interface NoteItem {
  id: string;
  track: number; // 0, 1, 2, 3
  pitch: number; // frequency in Hz
  noteName: string; // e.g. "C4", "G4"
  duration: number; // in seconds
  isLong?: boolean;
}

export interface Song {
  id: string;
  title: {
    en: string;
    hi: string;
  };
  artist: {
    en: string;
    hi: string;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  bpm: number;
  previewNote: string;
  notes: Array<{
    track: number;
    pitch: number;
    name: string;
    delayMs: number; // time between previous and this note
    duration?: number;
  }>;
}

export interface ActiveTile {
  id: string;
  track: number;
  top: number;
  pitch: number;
  noteName: string;
  duration?: number;
  isHit?: boolean;
  spawnTime: number;
}

export interface HitParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

export interface JudgementEvent {
  id: number;
  type: JudgementType;
  track: number;
  text: string;
  color: string;
}

export interface GameStats {
  score: number;
  combo: number;
  maxCombo: number;
  perfectCount: number;
  greatCount: number;
  goodCount: number;
  missCount: number;
  totalNotes: number;
  accuracy: number;
}
