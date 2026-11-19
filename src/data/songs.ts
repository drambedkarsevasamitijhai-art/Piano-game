/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Song } from '../types/game';
import { NOTE_FREQS } from '../utils/audio';

export const SONGS_LIBRARY: Song[] = [
  {
    id: 'ode_to_joy',
    title: {
      en: 'Ode to Joy (Symphony No. 9)',
      hi: 'आनंद गान (ओड टू जॉय - बीथोवेन)'
    },
    artist: {
      en: 'Ludwig van Beethoven',
      hi: 'लुडविग वैन बीथोवेन'
    },
    difficulty: 'easy',
    bpm: 120,
    previewNote: 'E4 - E4 - F4 - G4',
    notes: [
      // Theme 1: E E F G | G F E D | C C D E | E . D D
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 500 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 500 },
      { track: 2, pitch: NOTE_FREQS['F4'], name: 'F4', delayMs: 500 },
      { track: 3, pitch: NOTE_FREQS['G4'], name: 'G4', delayMs: 500 },

      { track: 3, pitch: NOTE_FREQS['G4'], name: 'G4', delayMs: 500 },
      { track: 2, pitch: NOTE_FREQS['F4'], name: 'F4', delayMs: 500 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 500 },
      { track: 0, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 500 },

      { track: 0, pitch: NOTE_FREQS['C4'], name: 'C4', delayMs: 500 },
      { track: 0, pitch: NOTE_FREQS['C4'], name: 'C4', delayMs: 500 },
      { track: 1, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 500 },
      { track: 2, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 500 },

      { track: 2, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 650 },
      { track: 1, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 350 },
      { track: 1, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 700 },

      // Theme 2: E E F G | G F E D | C C D E | D . C C
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 500 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 500 },
      { track: 2, pitch: NOTE_FREQS['F4'], name: 'F4', delayMs: 500 },
      { track: 3, pitch: NOTE_FREQS['G4'], name: 'G4', delayMs: 500 },

      { track: 3, pitch: NOTE_FREQS['G4'], name: 'G4', delayMs: 500 },
      { track: 2, pitch: NOTE_FREQS['F4'], name: 'F4', delayMs: 500 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 500 },
      { track: 0, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 500 },

      { track: 0, pitch: NOTE_FREQS['C4'], name: 'C4', delayMs: 500 },
      { track: 0, pitch: NOTE_FREQS['C4'], name: 'C4', delayMs: 500 },
      { track: 1, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 500 },
      { track: 2, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 500 },

      { track: 1, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 650 },
      { track: 0, pitch: NOTE_FREQS['C4'], name: 'C4', delayMs: 350 },
      { track: 0, pitch: NOTE_FREQS['C4'], name: 'C4', delayMs: 800 },

      // Bridge: D D E C | D E F E C | D E F E D | C D G3
      { track: 1, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 480 },
      { track: 1, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 480 },
      { track: 2, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 480 },
      { track: 0, pitch: NOTE_FREQS['C4'], name: 'C4', delayMs: 480 },

      { track: 1, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 480 },
      { track: 2, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 240 },
      { track: 3, pitch: NOTE_FREQS['F4'], name: 'F4', delayMs: 240 },
      { track: 2, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 480 },
      { track: 0, pitch: NOTE_FREQS['C4'], name: 'C4', delayMs: 480 },

      { track: 1, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 480 },
      { track: 2, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 240 },
      { track: 3, pitch: NOTE_FREQS['F4'], name: 'F4', delayMs: 240 },
      { track: 2, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 480 },
      { track: 1, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 480 },

      { track: 0, pitch: NOTE_FREQS['C4'], name: 'C4', delayMs: 480 },
      { track: 1, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 480 },
      { track: 0, pitch: NOTE_FREQS['G3'], name: 'G3', delayMs: 800 }
    ]
  },
  {
    id: 'twinkle_star',
    title: {
      en: 'Twinkle Twinkle Little Star',
      hi: 'ट्विंकल ट्विंकल लिटिल स्टार'
    },
    artist: {
      en: 'W.A. Mozart Melody',
      hi: 'पारंपरिक / मोज़ार्ट'
    },
    difficulty: 'easy',
    bpm: 110,
    previewNote: 'C4 - C4 - G4 - G4',
    notes: [
      // C C G G A A G | F F E E D D C
      { track: 0, pitch: NOTE_FREQS['C4'], name: 'C4', delayMs: 520 },
      { track: 0, pitch: NOTE_FREQS['C4'], name: 'C4', delayMs: 520 },
      { track: 2, pitch: NOTE_FREQS['G4'], name: 'G4', delayMs: 520 },
      { track: 2, pitch: NOTE_FREQS['G4'], name: 'G4', delayMs: 520 },
      { track: 3, pitch: NOTE_FREQS['A4'], name: 'A4', delayMs: 520 },
      { track: 3, pitch: NOTE_FREQS['A4'], name: 'A4', delayMs: 520 },
      { track: 2, pitch: NOTE_FREQS['G4'], name: 'G4', delayMs: 900 },

      { track: 1, pitch: NOTE_FREQS['F4'], name: 'F4', delayMs: 520 },
      { track: 1, pitch: NOTE_FREQS['F4'], name: 'F4', delayMs: 520 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 520 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 520 },
      { track: 0, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 520 },
      { track: 0, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 520 },
      { track: 0, pitch: NOTE_FREQS['C4'], name: 'C4', delayMs: 900 },

      // G G F F E E D | G G F F E E D
      { track: 2, pitch: NOTE_FREQS['G4'], name: 'G4', delayMs: 520 },
      { track: 2, pitch: NOTE_FREQS['G4'], name: 'G4', delayMs: 520 },
      { track: 1, pitch: NOTE_FREQS['F4'], name: 'F4', delayMs: 520 },
      { track: 1, pitch: NOTE_FREQS['F4'], name: 'F4', delayMs: 520 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 520 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 520 },
      { track: 0, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 900 },

      { track: 2, pitch: NOTE_FREQS['G4'], name: 'G4', delayMs: 520 },
      { track: 2, pitch: NOTE_FREQS['G4'], name: 'G4', delayMs: 520 },
      { track: 1, pitch: NOTE_FREQS['F4'], name: 'F4', delayMs: 520 },
      { track: 1, pitch: NOTE_FREQS['F4'], name: 'F4', delayMs: 520 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 520 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 520 },
      { track: 0, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 900 }
    ]
  },
  {
    id: 'raag_bhupali',
    title: {
      en: 'Raag Bhupali (Indian Classical Raga)',
      hi: 'राग भूपाली (शास्त्रीय धुन - सा रे ग प ध सा)'
    },
    artist: {
      en: 'Hindustani Classical',
      hi: 'भारतीय शास्त्रीय परंपरा'
    },
    difficulty: 'medium',
    bpm: 130,
    previewNote: 'Sa - Re - Ga - Pa - Dha',
    notes: [
      // Sa Re Ga, Ga Re Sa | Ga Pa Dha, Dha Pa Ga | Pa Dha Sa'
      { track: 0, pitch: NOTE_FREQS['C4'], name: 'Sa (C4)', delayMs: 450 },
      { track: 1, pitch: NOTE_FREQS['D4'], name: 'Re (D4)', delayMs: 450 },
      { track: 2, pitch: NOTE_FREQS['E4'], name: 'Ga (E4)', delayMs: 550 },
      { track: 2, pitch: NOTE_FREQS['E4'], name: 'Ga (E4)', delayMs: 450 },
      { track: 1, pitch: NOTE_FREQS['D4'], name: 'Re (D4)', delayMs: 450 },
      { track: 0, pitch: NOTE_FREQS['C4'], name: 'Sa (C4)', delayMs: 650 },

      { track: 2, pitch: NOTE_FREQS['E4'], name: 'Ga (E4)', delayMs: 450 },
      { track: 2, pitch: NOTE_FREQS['G4'], name: 'Pa (G4)', delayMs: 450 },
      { track: 3, pitch: NOTE_FREQS['A4'], name: 'Dha (A4)', delayMs: 550 },
      { track: 3, pitch: NOTE_FREQS['A4'], name: 'Dha (A4)', delayMs: 450 },
      { track: 2, pitch: NOTE_FREQS['G4'], name: 'Pa (G4)', delayMs: 450 },
      { track: 2, pitch: NOTE_FREQS['E4'], name: 'Ga (E4)', delayMs: 650 },

      { track: 2, pitch: NOTE_FREQS['G4'], name: 'Pa (G4)', delayMs: 400 },
      { track: 3, pitch: NOTE_FREQS['A4'], name: 'Dha (A4)', delayMs: 400 },
      { track: 3, pitch: NOTE_FREQS['C5'], name: 'Sȧ (C5)', delayMs: 600 },
      { track: 3, pitch: NOTE_FREQS['C5'], name: 'Sȧ (C5)', delayMs: 400 },
      { track: 3, pitch: NOTE_FREQS['A4'], name: 'Dha (A4)', delayMs: 400 },
      { track: 2, pitch: NOTE_FREQS['G4'], name: 'Pa (G4)', delayMs: 400 },
      { track: 2, pitch: NOTE_FREQS['E4'], name: 'Ga (E4)', delayMs: 400 },
      { track: 1, pitch: NOTE_FREQS['D4'], name: 'Re (D4)', delayMs: 400 },
      { track: 0, pitch: NOTE_FREQS['C4'], name: 'Sa (C4)', delayMs: 800 }
    ]
  },
  {
    id: 'fur_elise',
    title: {
      en: 'Für Elise',
      hi: 'फ्यूर एलिस (बीथोवेन)'
    },
    artist: {
      en: 'Ludwig van Beethoven',
      hi: 'लुडविग वैन बीथोवेन'
    },
    difficulty: 'hard',
    bpm: 145,
    previewNote: 'E5 - D#5 - E5 - D#5',
    notes: [
      // E5 D#5 E5 D#5 E5 B4 D5 C5 A4
      { track: 3, pitch: NOTE_FREQS['E5'], name: 'E5', delayMs: 320 },
      { track: 2, pitch: NOTE_FREQS['D#5'], name: 'D#5', delayMs: 320 },
      { track: 3, pitch: NOTE_FREQS['E5'], name: 'E5', delayMs: 320 },
      { track: 2, pitch: NOTE_FREQS['D#5'], name: 'D#5', delayMs: 320 },
      { track: 3, pitch: NOTE_FREQS['E5'], name: 'E5', delayMs: 320 },
      { track: 1, pitch: NOTE_FREQS['B4'], name: 'B4', delayMs: 320 },
      { track: 2, pitch: NOTE_FREQS['D5'], name: 'D5', delayMs: 320 },
      { track: 1, pitch: NOTE_FREQS['C5'], name: 'C5', delayMs: 320 },
      { track: 0, pitch: NOTE_FREQS['A4'], name: 'A4', delayMs: 650 },

      // C4 E4 A4 B4 | E4 G#4 B4 C5
      { track: 0, pitch: NOTE_FREQS['C4'], name: 'C4', delayMs: 320 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 320 },
      { track: 2, pitch: NOTE_FREQS['A4'], name: 'A4', delayMs: 320 },
      { track: 3, pitch: NOTE_FREQS['B4'], name: 'B4', delayMs: 650 },

      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 320 },
      { track: 2, pitch: NOTE_FREQS['G#4'], name: 'G#4', delayMs: 320 },
      { track: 3, pitch: NOTE_FREQS['B4'], name: 'B4', delayMs: 320 },
      { track: 3, pitch: NOTE_FREQS['C5'], name: 'C5', delayMs: 650 },

      // E4 E5 D#5 E5 D#5 E5 B4 D5 C5 A4
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 320 },
      { track: 3, pitch: NOTE_FREQS['E5'], name: 'E5', delayMs: 320 },
      { track: 2, pitch: NOTE_FREQS['D#5'], name: 'D#5', delayMs: 320 },
      { track: 3, pitch: NOTE_FREQS['E5'], name: 'E5', delayMs: 320 },
      { track: 2, pitch: NOTE_FREQS['D#5'], name: 'D#5', delayMs: 320 },
      { track: 3, pitch: NOTE_FREQS['E5'], name: 'E5', delayMs: 320 },
      { track: 1, pitch: NOTE_FREQS['B4'], name: 'B4', delayMs: 320 },
      { track: 2, pitch: NOTE_FREQS['D5'], name: 'D5', delayMs: 320 },
      { track: 1, pitch: NOTE_FREQS['C5'], name: 'C5', delayMs: 320 },
      { track: 0, pitch: NOTE_FREQS['A4'], name: 'A4', delayMs: 750 }
    ]
  },
  {
    id: 'canon_in_d',
    title: {
      en: 'Canon in D',
      hi: 'कैनन इन डी (पैचेलबेल)'
    },
    artist: {
      en: 'Johann Pachelbel',
      hi: 'जोहान पैचेलबेल'
    },
    difficulty: 'medium',
    bpm: 115,
    previewNote: 'F#4 - E4 - D4 - C#4',
    notes: [
      { track: 3, pitch: NOTE_FREQS['F#4'], name: 'F#4', delayMs: 500 },
      { track: 2, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 500 },
      { track: 1, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 500 },
      { track: 0, pitch: NOTE_FREQS['C#4'], name: 'C#4', delayMs: 500 },
      { track: 1, pitch: NOTE_FREQS['B4'], name: 'B4', delayMs: 500 },
      { track: 0, pitch: NOTE_FREQS['A4'], name: 'A4', delayMs: 500 },
      { track: 1, pitch: NOTE_FREQS['B4'], name: 'B4', delayMs: 500 },
      { track: 2, pitch: NOTE_FREQS['C#5'], name: 'C#5', delayMs: 700 },

      { track: 1, pitch: NOTE_FREQS['D5'], name: 'D5', delayMs: 380 },
      { track: 2, pitch: NOTE_FREQS['C#5'], name: 'C#5', delayMs: 380 },
      { track: 1, pitch: NOTE_FREQS['B4'], name: 'B4', delayMs: 380 },
      { track: 0, pitch: NOTE_FREQS['A4'], name: 'A4', delayMs: 380 },
      { track: 1, pitch: NOTE_FREQS['G4'], name: 'G4', delayMs: 380 },
      { track: 2, pitch: NOTE_FREQS['F#4'], name: 'F#4', delayMs: 380 },
      { track: 1, pitch: NOTE_FREQS['G4'], name: 'G4', delayMs: 380 },
      { track: 2, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 650 }
    ]
  },
  {
    id: 'jingle_bells',
    title: {
      en: 'Jingle Bells',
      hi: 'जिंगल बेल्स (उत्साही धुन)'
    },
    artist: {
      en: 'Traditional Festive',
      hi: 'पारंपरिक संगीत'
    },
    difficulty: 'easy',
    bpm: 125,
    previewNote: 'E4 - E4 - E4',
    notes: [
      // E E E | E E E | E G C D | E
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 400 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 400 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 700 },

      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 400 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 400 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 700 },

      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 400 },
      { track: 3, pitch: NOTE_FREQS['G4'], name: 'G4', delayMs: 400 },
      { track: 0, pitch: NOTE_FREQS['C4'], name: 'C4', delayMs: 400 },
      { track: 1, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 400 },
      { track: 2, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 900 },

      // F F F F | F E E E | E D D E | D G
      { track: 2, pitch: NOTE_FREQS['F4'], name: 'F4', delayMs: 400 },
      { track: 2, pitch: NOTE_FREQS['F4'], name: 'F4', delayMs: 400 },
      { track: 2, pitch: NOTE_FREQS['F4'], name: 'F4', delayMs: 400 },
      { track: 2, pitch: NOTE_FREQS['F4'], name: 'F4', delayMs: 400 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 400 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 400 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 400 },
      { track: 0, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 400 },
      { track: 0, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 400 },
      { track: 1, pitch: NOTE_FREQS['E4'], name: 'E4', delayMs: 400 },
      { track: 0, pitch: NOTE_FREQS['D4'], name: 'D4', delayMs: 500 },
      { track: 3, pitch: NOTE_FREQS['G4'], name: 'G4', delayMs: 800 }
    ]
  }
];

export const ENDLESS_SCALE_NOTES = [
  { track: 0, pitch: NOTE_FREQS['C4'], name: 'C4' },
  { track: 1, pitch: NOTE_FREQS['D4'], name: 'D4' },
  { track: 2, pitch: NOTE_FREQS['E4'], name: 'E4' },
  { track: 3, pitch: NOTE_FREQS['F4'], name: 'F4' },
  { track: 2, pitch: NOTE_FREQS['G4'], name: 'G4' },
  { track: 3, pitch: NOTE_FREQS['A4'], name: 'A4' },
  { track: 2, pitch: NOTE_FREQS['B4'], name: 'B4' },
  { track: 3, pitch: NOTE_FREQS['C5'], name: 'C5' },
  { track: 1, pitch: NOTE_FREQS['D5'], name: 'D5' },
  { track: 2, pitch: NOTE_FREQS['E5'], name: 'E5' }
];
