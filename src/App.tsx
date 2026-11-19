/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  GameState,
  GameMode,
  Difficulty,
  Language,
  ActiveTile,
  JudgementEvent,
  HitParticle,
  GameStats,
  Song
} from './types/game';
import { SONGS_LIBRARY, ENDLESS_SCALE_NOTES } from './data/songs';
import { soundEngine } from './utils/audio';
import { TRANSLATIONS } from './utils/i18n';
import { TopBar } from './components/TopBar';
import { ScoreDashboard } from './components/ScoreDashboard';
import { HintBanner } from './components/HintBanner';
import { GameBoard } from './components/GameBoard';
import { Controls } from './components/Controls';
import { GameOverModal } from './components/GameOverModal';
import { SongSelectorModal } from './components/SongSelectorModal';
import { SettingsModal } from './components/SettingsModal';
import { PianoVisualizer } from './components/PianoVisualizer';

const HIT_LINE_Y = 405; // Target strike line Y position (480 - 75)

export default function App() {
  // Game Configuration State
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('piano_rhythm_lang') as Language) || 'hi';
  });
  const [gameMode, setGameMode] = useState<GameMode>('song');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [currentSong, setCurrentSong] = useState<Song>(SONGS_LIBRARY[0]);
  const [showHints, setShowHints] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals State
  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Gameplay Dynamic State
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [tiles, setTiles] = useState<ActiveTile[]>([]);
  const [activeTracks, setActiveTracks] = useState<boolean[]>([false, false, false, false]);
  const [judgements, setJudgements] = useState<JudgementEvent[]>([]);
  const [particles, setParticles] = useState<HitParticle[]>([]);
  const [gameOverReason, setGameOverReason] = useState<string>('');

  // Stats
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    combo: 0,
    maxCombo: 0,
    perfectCount: 0,
    greatCount: 0,
    goodCount: 0,
    missCount: 0,
    totalNotes: 0,
    accuracy: 100
  });

  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem('piano_rhythm_highscore');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Song progress
  const [songNoteIndex, setSongNoteIndex] = useState(0);

  // Refs for requestAnimationFrame & timers to avoid stale closure issues
  const stateRef = useRef<{
    gameState: GameState;
    tiles: ActiveTile[];
    speed: number;
    stats: GameStats;
    gameMode: GameMode;
    difficulty: Difficulty;
    currentSong: Song;
    songNoteIndex: number;
    lastTime: number;
    spawnTimerId: NodeJS.Timeout | null;
  }>({
    gameState: 'MENU',
    tiles: [],
    speed: 3.5,
    stats: {
      score: 0,
      combo: 0,
      maxCombo: 0,
      perfectCount: 0,
      greatCount: 0,
      goodCount: 0,
      missCount: 0,
      totalNotes: 0,
      accuracy: 100
    },
    gameMode: 'song',
    difficulty: 'normal',
    currentSong: SONGS_LIBRARY[0],
    songNoteIndex: 0,
    lastTime: performance.now(),
    spawnTimerId: null
  });

  // Keep stateRef in sync with dynamic settings
  useEffect(() => {
    stateRef.current.gameMode = gameMode;
    stateRef.current.difficulty = difficulty;
    stateRef.current.currentSong = currentSong;
  }, [gameMode, difficulty, currentSong]);

  const t = TRANSLATIONS[lang];

  // Language toggle
  const handleToggleLang = () => {
    const next = lang === 'hi' ? 'en' : 'hi';
    setLang(next);
    localStorage.setItem('piano_rhythm_lang', next);
  };

  // Sound mute toggle
  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  // Base speed calculation
  const getBaseSpeed = useCallback(() => {
    let base = 3.6;
    if (difficulty === 'easy') base = 3.0;
    if (difficulty === 'hard') base = 4.4;
    return base;
  }, [difficulty]);

  // Particles generator
  const createHitParticles = useCallback((trackIndex: number) => {
    const x = trackIndex * 90 + 45;
    const y = HIT_LINE_Y;
    const newParticles: HitParticle[] = [];
    const colors = ['#38bdf8', '#7dd3fc', '#facc15', '#ffffff', '#a855f7'];

    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      newParticles.push({
        id: Math.random(),
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1.0,
        size: Math.random() * 3.5 + 2
      });
    }

    setParticles((prev) => [...prev.slice(-40), ...newParticles]);
  }, []);

  // Judgement popup
  const showJudgement = useCallback((type: 'PERFECT' | 'GREAT' | 'GOOD' | 'MISS', trackIndex: number) => {
    const textMap = {
      PERFECT: 'PERFECT! +100',
      GREAT: 'GREAT! +75',
      GOOD: 'GOOD! +50',
      MISS: 'MISS'
    };
    const colorMap = {
      PERFECT: '#38bdf8',
      GREAT: '#34d399',
      GOOD: '#fbbf24',
      MISS: '#f87171'
    };

    const newJudgement: JudgementEvent = {
      id: Date.now() + Math.random(),
      type,
      track: trackIndex,
      text: textMap[type],
      color: colorMap[type]
    };

    setJudgements((prev) => [...prev.slice(-3), newJudgement]);

    setTimeout(() => {
      setJudgements((prev) => prev.filter((j) => j.id !== newJudgement.id));
    }, 600);
  }, []);

  // Trigger Game Over
  const handleGameOver = useCallback((reason: string) => {
    stateRef.current.gameState = 'GAME_OVER';
    setGameState('GAME_OVER');
    setGameOverReason(reason);

    if (stateRef.current.spawnTimerId) {
      clearTimeout(stateRef.current.spawnTimerId);
      stateRef.current.spawnTimerId = null;
    }

    // Update High Score if beaten
    const currentScore = stateRef.current.stats.score;
    if (currentScore > highScore) {
      setHighScore(currentScore);
      localStorage.setItem('piano_rhythm_highscore', currentScore.toString());
    }
  }, [highScore]);

  // Trigger Victory
  const handleVictory = useCallback(() => {
    stateRef.current.gameState = 'VICTORY';
    setGameState('VICTORY');

    if (stateRef.current.spawnTimerId) {
      clearTimeout(stateRef.current.spawnTimerId);
      stateRef.current.spawnTimerId = null;
    }

    soundEngine.playVictoryFanfare();

    const currentScore = stateRef.current.stats.score;
    if (currentScore > highScore) {
      setHighScore(currentScore);
      localStorage.setItem('piano_rhythm_highscore', currentScore.toString());
    }
  }, [highScore]);

  // Spawn next tile logic
  const spawnNextTile = useCallback(() => {
    if (stateRef.current.gameState !== 'PLAYING') return;

    const { gameMode, currentSong, songNoteIndex } = stateRef.current;

    let track = 0;
    let pitch = 261.63;
    let noteName = 'C4';
    let delayMs = 600;

    if (gameMode === 'song') {
      if (songNoteIndex >= currentSong.notes.length) {
        // All song notes have been spawned! Check if board empty
        if (stateRef.current.tiles.length === 0) {
          handleVictory();
        }
        return;
      }

      const songNote = currentSong.notes[songNoteIndex];
      track = songNote.track;
      pitch = songNote.pitch;
      noteName = songNote.name;
      delayMs = songNote.delayMs;

      stateRef.current.songNoteIndex++;
      setSongNoteIndex(stateRef.current.songNoteIndex);
    } else {
      // Endless or Zen Mode: procedural scale melody
      const scaleNote = ENDLESS_SCALE_NOTES[Math.floor(Math.random() * ENDLESS_SCALE_NOTES.length)];
      track = Math.floor(Math.random() * 4);
      pitch = scaleNote.pitch;
      noteName = scaleNote.name;

      const scoreDiscount = Math.min(400, stateRef.current.stats.score * 10);
      delayMs = Math.max(500, 1000 - scoreDiscount);
    }

    const newTile: ActiveTile = {
      id: `${Date.now()}_${Math.random()}`,
      track,
      top: -90,
      pitch,
      noteName,
      spawnTime: performance.now()
    };

    stateRef.current.tiles.push(newTile);
    setTiles([...stateRef.current.tiles]);

    // Schedule subsequent spawn
    stateRef.current.spawnTimerId = setTimeout(spawnNextTile, delayMs);
  }, [handleVictory]);

  // Start / Restart Game
  const startGame = useCallback(() => {
    soundEngine.init();

    if (stateRef.current.spawnTimerId) {
      clearTimeout(stateRef.current.spawnTimerId);
      stateRef.current.spawnTimerId = null;
    }

    const baseSpeed = getBaseSpeed();
    const initialStats: GameStats = {
      score: 0,
      combo: 0,
      maxCombo: 0,
      perfectCount: 0,
      greatCount: 0,
      goodCount: 0,
      missCount: 0,
      totalNotes: 0,
      accuracy: 100
    };

    stateRef.current.gameState = 'PLAYING';
    stateRef.current.tiles = [];
    stateRef.current.speed = baseSpeed;
    stateRef.current.stats = initialStats;
    stateRef.current.songNoteIndex = 0;
    stateRef.current.lastTime = performance.now();

    setGameState('PLAYING');
    setTiles([]);
    setSongNoteIndex(0);
    setStats(initialStats);
    setJudgements([]);
    setParticles([]);

    // Spawn first tile
    spawnNextTile();
  }, [getBaseSpeed, spawnNextTile]);

  // Handle Key / Track Input
  const handleInput = useCallback((trackIndex: number) => {
    // Light up button visually
    setActiveTracks((prev) => {
      const next = [...prev];
      next[trackIndex] = true;
      return next;
    });
    setTimeout(() => {
      setActiveTracks((prev) => {
        const next = [...prev];
        next[trackIndex] = false;
        return next;
      });
    }, 120);

    if (stateRef.current.gameState !== 'PLAYING') {
      // Allow free piano jamming when not in a game!
      const freeFreqs = [261.63, 293.66, 329.63, 392.00];
      soundEngine.playPianoNote(freeFreqs[trackIndex], 0.5, trackIndex);
      return;
    }

    const currentTiles = stateRef.current.tiles;
    if (currentTiles.length === 0) return;

    // Target is the lowest tile on the board (first in queue)
    const targetTile = currentTiles[0];

    // Check if wrong key was hit
    if (trackIndex !== targetTile.track) {
      soundEngine.playWrongBuzzer();

      if (stateRef.current.gameMode === 'zen') {
        // Zen mode: reset combo, but don't terminate
        stateRef.current.stats.combo = 0;
        stateRef.current.stats.missCount++;
        showJudgement('MISS', trackIndex);
        setStats({ ...stateRef.current.stats });
        return;
      }

      // Strict rhythm game rule: Game Over!
      const reason =
        lang === 'hi'
          ? `${t.wrongKey} ${t.youPressed} '${trackIndex + 1}', ${t.correctWas} '${targetTile.track + 1}'`
          : `${t.wrongKey} ${t.youPressed} '${trackIndex + 1}', ${t.correctWas} '${targetTile.track + 1}'`;
      handleGameOver(reason);
      return;
    }

    // Correct key hit! Calculate timing accuracy based on target line
    const tileCenter = targetTile.top + 42;
    const delta = Math.abs(tileCenter - HIT_LINE_Y);

    let judgementType: 'PERFECT' | 'GREAT' | 'GOOD' = 'GOOD';
    let addedPoints = 50;

    if (delta <= 32) {
      judgementType = 'PERFECT';
      addedPoints = 100;
      stateRef.current.stats.perfectCount++;
    } else if (delta <= 64) {
      judgementType = 'GREAT';
      addedPoints = 75;
      stateRef.current.stats.greatCount++;
    } else {
      judgementType = 'GOOD';
      addedPoints = 50;
      stateRef.current.stats.goodCount++;
    }

    // Play synthesized piano note!
    soundEngine.playPianoNote(targetTile.pitch, 0.6, trackIndex);

    // Particle explosion
    createHitParticles(trackIndex);

    // Judgement popup
    showJudgement(judgementType, trackIndex);

    // Update Combo & Multiplier
    const currentCombo = stateRef.current.stats.combo + 1;
    stateRef.current.stats.combo = currentCombo;
    if (currentCombo > stateRef.current.stats.maxCombo) {
      stateRef.current.stats.maxCombo = currentCombo;
    }

    let multiplier = 1;
    if (currentCombo >= 30) multiplier = 3;
    else if (currentCombo >= 15) multiplier = 2;
    else if (currentCombo >= 5) multiplier = 1.5;

    // Combo milestones celebration
    if (currentCombo === 10 || currentCombo === 25 || currentCombo === 50) {
      soundEngine.playComboChime(multiplier);
    }

    // Score
    stateRef.current.stats.score += Math.round(addedPoints * multiplier);
    stateRef.current.stats.totalNotes++;

    // Calculate accuracy %
    const totalHit =
      stateRef.current.stats.perfectCount +
      stateRef.current.stats.greatCount +
      stateRef.current.stats.goodCount;
    const accuracy = Math.round(
      ((stateRef.current.stats.perfectCount * 1.0 +
        stateRef.current.stats.greatCount * 0.8 +
        stateRef.current.stats.goodCount * 0.5) /
        Math.max(1, totalHit + stateRef.current.stats.missCount)) *
        100
    );
    stateRef.current.stats.accuracy = accuracy;

    // Slight speed progression in endless mode
    if (stateRef.current.gameMode === 'endless' && stateRef.current.stats.score % 250 === 0) {
      stateRef.current.speed += 0.25;
    }

    // Remove hit tile from queue
    stateRef.current.tiles.shift();
    setTiles([...stateRef.current.tiles]);
    setStats({ ...stateRef.current.stats });

    // Check if song complete
    if (
      stateRef.current.gameMode === 'song' &&
      stateRef.current.songNoteIndex >= stateRef.current.currentSong.notes.length &&
      stateRef.current.tiles.length === 0
    ) {
      handleVictory();
    }
  }, [createHitParticles, handleGameOver, handleVictory, lang, showJudgement, t]);

  // Main 60fps Game Loop via requestAnimationFrame
  useEffect(() => {
    let animId: number;

    const loop = (timestamp: number) => {
      const dt = Math.min(32, timestamp - stateRef.current.lastTime);
      stateRef.current.lastTime = timestamp;

      if (stateRef.current.gameState === 'PLAYING') {
        const speed = stateRef.current.speed;
        const currentTiles = stateRef.current.tiles;

        // Move tiles down
        for (let i = 0; i < currentTiles.length; i++) {
          const t = currentTiles[i];
          t.top += speed * (dt / 16.6);

          // Tile missed! (Bottom exceeded)
          if (t.top > 480) {
            if (stateRef.current.gameMode === 'zen') {
              // Zen mode: drop tile quietly
              currentTiles.splice(i, 1);
              stateRef.current.stats.combo = 0;
              stateRef.current.stats.missCount++;
              setStats({ ...stateRef.current.stats });
              break;
            } else {
              soundEngine.playWrongBuzzer();
              handleGameOver(lang === 'hi' ? 'टाइल मिस हो गई!' : 'Tile Missed!');
              return;
            }
          }
        }

        setTiles([...currentTiles]);
      }

      // Update particle physics
      setParticles((prev) => {
        if (prev.length === 0) return prev;
        return prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.12, // subtle gravity
            alpha: p.alpha - 0.035
          }))
          .filter((p) => p.alpha > 0);
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [handleGameOver, lang]);

  // Global Keyboard event handler (D, F, J, K and 1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input field
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const key = e.key.toLowerCase();
      if (key === 'd' || key === '1' || e.code === 'ArrowLeft') {
        e.preventDefault();
        handleInput(0);
      } else if (key === 'f' || key === '2' || e.code === 'ArrowDown') {
        e.preventDefault();
        handleInput(1);
      } else if (key === 'j' || key === '3' || e.code === 'ArrowUp') {
        e.preventDefault();
        handleInput(2);
      } else if (key === 'k' || key === '4' || e.code === 'ArrowRight') {
        e.preventDefault();
        handleInput(3);
      } else if (e.code === 'Space') {
        if (stateRef.current.gameState === 'MENU' || stateRef.current.gameState === 'GAME_OVER' || stateRef.current.gameState === 'VICTORY') {
          e.preventDefault();
          startGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput, startGame]);

  // Current multiplier computation for display
  const currentMultiplier =
    stats.combo >= 30 ? 3 : stats.combo >= 15 ? 2 : stats.combo >= 5 ? 1.5 : 1;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-sky-500 selection:text-slate-950">
      {/* Top Bar Navigation */}
      <TopBar
        lang={lang}
        onToggleLang={handleToggleLang}
        gameMode={gameMode}
        onSelectMode={(mode) => {
          setGameMode(mode);
          setGameState('MENU');
          setTiles([]);
        }}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenSongModal={() => setIsSongModalOpen(true)}
        currentSongTitle={lang === 'hi' ? currentSong.title.hi : currentSong.title.en}
      />

      {/* Main Arcade Cabinet Centerpiece */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-4 max-w-5xl mx-auto w-full relative">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full">
          {/* Left Decorative/Info Column (on large screens) */}
          <div className="hidden lg:flex flex-col gap-4 w-52 text-left">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400 block mb-1">
                {lang === 'hi' ? 'सक्रिय धुन' : 'Active Song'}
              </span>
              <h3 className="text-sm font-bold text-white mb-0.5 line-clamp-1">
                {lang === 'hi' ? currentSong.title.hi : currentSong.title.en}
              </h3>
              <p className="text-xs text-slate-400 mb-3 line-clamp-1">
                {lang === 'hi' ? currentSong.artist.hi : currentSong.artist.en}
              </p>
              <button
                onClick={() => setIsSongModalOpen(true)}
                className="w-full py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-semibold rounded-lg transition-colors border border-slate-700/60 cursor-pointer"
              >
                {t.changeSong}
              </button>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl text-xs space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
                {lang === 'hi' ? 'कुंजी निर्देश' : 'Key Bindings'}
              </span>
              <div className="flex justify-between text-slate-400">
                <span>Lane 1:</span>
                <span className="font-mono text-white font-bold">D / 1</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Lane 2:</span>
                <span className="font-mono text-white font-bold">F / 2</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Lane 3:</span>
                <span className="font-mono text-white font-bold">J / 3</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Lane 4:</span>
                <span className="font-mono text-white font-bold">K / 4</span>
              </div>
            </div>
          </div>

          {/* Center Play Area */}
          <div className="flex flex-col items-center w-full max-w-[360px]">
            {/* Score & Combo Dashboard */}
            <ScoreDashboard
              score={stats.score}
              highScore={highScore}
              combo={stats.combo}
              multiplier={currentMultiplier}
              lang={lang}
              gameMode={gameMode}
              songProgress={{
                current: songNoteIndex,
                total: currentSong.notes.length
              }}
            />

            {/* Real-time Target Hint Banner */}
            <HintBanner
              tiles={tiles}
              isPlaying={gameState === 'PLAYING'}
              isGameOver={gameState === 'GAME_OVER'}
              lang={lang}
              showHints={showHints}
            />

            {/* 4-Lane Game Container */}
            <div className="relative w-full max-w-[360px]">
              <GameBoard
                tiles={tiles}
                judgements={judgements}
                particles={particles}
                activeTracks={activeTracks}
                onTrackClick={handleInput}
                speed={stateRef.current.speed}
              />

              {/* Start Menu / Game Over / Victory Modal Overlay */}
              <GameOverModal
                gameState={gameState}
                onStart={startGame}
                onSelectSong={() => setIsSongModalOpen(true)}
                lang={lang}
                stats={stats}
                gameOverReason={gameOverReason}
                currentSong={gameMode === 'song' ? currentSong : undefined}
              />
            </div>

            {/* Tactile Bottom Control Buttons (1 / D, 2 / F, 3 / J, 4 / K) */}
            <Controls onInput={handleInput} activeTracks={activeTracks} />
          </div>

          {/* Right Column: Audio Resonator Visualizer & Quick Stats */}
          <div className="hidden lg:flex flex-col gap-4 w-52">
            <PianoVisualizer activeTracks={activeTracks} />

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl text-xs space-y-2.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                {lang === 'hi' ? 'सटीकता दर' : 'Performance'}
              </span>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">{t.accuracy}:</span>
                <span className="font-mono font-bold text-emerald-400 tabular-nums">
                  {stats.accuracy}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">{t.maxCombo}:</span>
                <span className="font-mono font-bold text-amber-400 tabular-nums">
                  {stats.maxCombo}x
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">{t.perfect}:</span>
                <span className="font-mono font-bold text-sky-400 tabular-nums">
                  {stats.perfectCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Song Selection Modal */}
      <SongSelectorModal
        isOpen={isSongModalOpen}
        onClose={() => setIsSongModalOpen(false)}
        onSelectSong={(song) => {
          setCurrentSong(song);
          setGameState('MENU');
          setTiles([]);
        }}
        currentSongId={currentSong.id}
        lang={lang}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        lang={lang}
        onToggleLang={handleToggleLang}
        difficulty={difficulty}
        onSetDifficulty={setDifficulty}
        showHints={showHints}
        onToggleHints={() => setShowHints(!showHints)}
        volume={volume}
        onSetVolume={setVolume}
      />
    </div>
  );
}
