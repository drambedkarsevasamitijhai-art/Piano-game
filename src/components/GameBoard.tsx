/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { ActiveTile, JudgementEvent, HitParticle } from '../types/game';

interface GameBoardProps {
  tiles: ActiveTile[];
  judgements: JudgementEvent[];
  particles: HitParticle[];
  activeTracks: boolean[];
  onTrackClick: (trackIndex: number) => void;
  speed: number;
}

const TRACK_KEYS = ['D', 'F', 'J', 'K'];

export const GameBoard: React.FC<GameBoardProps> = ({
  tiles,
  judgements,
  particles,
  activeTracks,
  onTrackClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render particles on canvas overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }, [particles]);

  return (
    <div
      className="relative w-full max-w-[360px] h-[480px] bg-slate-950 border-2 border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/20 select-none touch-manipulation flex"
      style={{
        backgroundImage: 'radial-gradient(ellipse at bottom, rgba(14, 165, 233, 0.08) 0%, rgba(2, 6, 23, 0.95) 70%)'
      }}
    >
      {/* Target Hit Line with glowing laser reflection */}
      <div
        className="absolute bottom-[75px] left-0 w-full h-[4px] bg-rose-500 z-10 pointer-events-none shadow-[0_0_14px_#f43f5e]"
      >
        <div className="absolute -top-3 left-0 w-full flex justify-between px-2 text-[10px] font-bold text-rose-400/80 tracking-widest uppercase">
          <span>HIT ZONE</span>
          <span>STRIKE LINE</span>
        </div>
        <div className="w-full h-full bg-white/40 animate-pulse" />
      </div>

      {/* 4 Tracks */}
      {[0, 1, 2, 3].map((trackIndex) => {
        const isTrackActive = activeTracks[trackIndex];
        return (
          <div
            key={trackIndex}
            onPointerDown={(e) => {
              e.preventDefault();
              onTrackClick(trackIndex);
            }}
            className={`flex-1 relative h-full border-r border-slate-800/80 cursor-pointer transition-colors duration-100 ${
              trackIndex === 3 ? 'border-r-0' : ''
            } ${
              isTrackActive ? 'bg-sky-500/15' : 'hover:bg-slate-900/30'
            }`}
          >
            {/* Lane Track guide line in center */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-slate-800/40 border-r border-dashed border-slate-700/30" />

            {/* Hit impact glow when track is active */}
            {isTrackActive && (
              <div className="absolute bottom-[60px] inset-x-1 h-[35px] bg-gradient-to-t from-sky-400/50 to-transparent rounded-lg blur-xs pointer-events-none" />
            )}

            {/* Key guide at the bottom target zone */}
            <div className="absolute bottom-2 inset-x-0 text-center pointer-events-none">
              <span className="text-xs font-black text-slate-400 tracking-wider">
                {trackIndex + 1}
              </span>
              <span className="block text-[10px] text-slate-400 font-semibold">
                ({TRACK_KEYS[trackIndex]})
              </span>
            </div>
          </div>
        );
      })}

      {/* Moving Tiles */}
      {tiles.map((tile) => {
        const leftPercent = tile.track * 25;
        return (
          <div
            key={tile.id}
            className="absolute rounded-xl z-20 flex flex-col items-center justify-center font-bold text-slate-950 pointer-events-none transition-transform"
            style={{
              left: `calc(${leftPercent}% + 3px)`,
              width: 'calc(25% - 6px)',
              top: `${tile.top}px`,
              height: '84px',
              background: 'linear-gradient(180deg, #7dd3fc 0%, #38bdf8 30%, #0284c7 100%)',
              border: '2px solid #e0f2fe',
              boxShadow: '0 4px 16px rgba(56, 189, 248, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.8)'
            }}
          >
            {/* Number of Lane */}
            <span className="text-xl font-black text-slate-950 leading-none drop-shadow-xs">
              {tile.track + 1}
            </span>
            {/* Note Name */}
            <span className="text-[11px] font-extrabold text-sky-950 mt-0.5 tracking-tight px-1.5 py-0.5 bg-white/40 rounded">
              {tile.noteName}
            </span>
          </div>
        );
      })}

      {/* Judgement Popups (PERFECT, GREAT, GOOD) */}
      {judgements.map((j) => (
        <div
          key={j.id}
          className="absolute z-30 pointer-events-none font-black text-sm tracking-wider uppercase animate-out fade-out duration-500 fill-mode-forwards"
          style={{
            left: `${j.track * 25 + 12.5}%`,
            bottom: '95px',
            transform: 'translateX(-50%)',
            color: j.color,
            textShadow: '0 0 10px rgba(0,0,0,0.9), 0 0 18px currentColor'
          }}
        >
          {j.text}
        </div>
      ))}

      {/* Particles Canvas Overlay */}
      <canvas
        ref={canvasRef}
        width={360}
        height={480}
        className="absolute inset-0 pointer-events-none z-30"
      />
    </div>
  );
};
