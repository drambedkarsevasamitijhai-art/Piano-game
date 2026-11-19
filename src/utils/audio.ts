/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Acoustic piano note frequency table (C3 to B5)
export const NOTE_FREQS: Record<string, number> = {
  'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99,
  'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99,
  'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'B5': 987.77,
  'C6': 1046.50
};

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private pianoGain: GainNode | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.8;
  private analyser: AnalyserNode | null = null;
  public frequencyData: Uint8Array<ArrayBuffer> | null = null;

  constructor() {
    // Lazy initialize on first interaction
  }

  public init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);

    this.pianoGain = this.ctx.createGain();
    this.pianoGain.gain.setValueAtTime(0.9, this.ctx.currentTime);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(0.6, this.ctx.currentTime);

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

    this.pianoGain.connect(this.analyser);
    this.sfxGain.connect(this.analyser);
    this.analyser.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume() {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public getIsMuted() {
    return this.isMuted;
  }

  /**
   * Synthesize an authentic acoustic piano timbre using harmonic additive synthesis,
   * felt-hammer transient impulse, and subtle stereo stage panning.
   */
  public playPianoNote(freq: number, durationSec: number = 0.6, trackIndex: number = 1) {
    this.init();
    if (!this.ctx || !this.pianoGain || this.isMuted) return;

    const now = this.ctx.currentTime;

    // Stereo panning based on track (track 0 is left-most, track 3 is right-most)
    const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
    if (panner) {
      const panValue = (trackIndex - 1.5) / 1.5 * 0.45; // -0.45 to +0.45
      panner.pan.setValueAtTime(panValue, now);
    }

    const noteGain = this.ctx.createGain();
    // Fast attack (10ms) followed by natural piano acoustic decay
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.55, now + 0.012);
    noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.12);
    noteGain.gain.exponentialRampToValueAtTime(0.0005, now + durationSec);

    // Primary Fundamental Harmonic (warm triangle wave)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    // 2nd Harmonic (gentle sine wave overtone)
    const osc2 = this.ctx.createOscillator();
    const osc2Gain = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);
    osc2Gain.gain.setValueAtTime(0.25, now);
    osc2Gain.gain.exponentialRampToValueAtTime(0.001, now + (durationSec * 0.7));
    osc2.connect(osc2Gain);

    // 3rd Harmonic (brightness / chime)
    const osc3 = this.ctx.createOscillator();
    const osc3Gain = this.ctx.createGain();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3, now);
    osc3Gain.gain.setValueAtTime(0.08, now);
    osc3Gain.gain.exponentialRampToValueAtTime(0.001, now + (durationSec * 0.4));
    osc3.connect(osc3Gain);

    // Piano hammer strike percussive click (felt hitting copper string)
    const hammerBuffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.025), this.ctx.sampleRate);
    const channelData = hammerBuffer.getChannelData(0);
    for (let i = 0; i < channelData.length; i++) {
      channelData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.006));
    }
    const hammerSource = this.ctx.createBufferSource();
    hammerSource.buffer = hammerBuffer;
    const hammerGain = this.ctx.createGain();
    hammerGain.gain.setValueAtTime(0.12, now);
    hammerSource.connect(hammerGain);

    // Lowpass filter to emulate piano wooden soundboard resonance
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(3800, freq * 4.5), now);
    filter.Q.setValueAtTime(1.2, now);

    osc1.connect(noteGain);
    osc2Gain.connect(noteGain);
    osc3Gain.connect(noteGain);
    hammerGain.connect(noteGain);

    noteGain.connect(filter);

    if (panner) {
      filter.connect(panner);
      panner.connect(this.pianoGain);
    } else {
      filter.connect(this.pianoGain);
    }

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    hammerSource.start(now);

    osc1.stop(now + durationSec + 0.05);
    osc2.stop(now + durationSec + 0.05);
    osc3.stop(now + durationSec + 0.05);
    hammerSource.stop(now + 0.03);
  }

  /**
   * Gentle error sound when wrong key is pressed
   */
  public playWrongBuzzer() {
    this.init();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.28);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.29);
  }

  /**
   * Sparkle sound for combo milestones (10, 25, 50 combo)
   */
  public playComboChime(multiplier: number = 1) {
    this.init();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major chord sparkle
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime + (idx * 0.045);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * Math.min(1.5, 1 + (multiplier * 0.05)), now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.32);
    });
  }

  /**
   * Victory / Song Completed Fanfare
   */
  public playVictoryFanfare() {
    this.init();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const chord = [392.00, 523.25, 659.25, 783.99]; // G-C-E-G
    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime + (idx * 0.08);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.85);
    });
  }

  /**
   * Get dynamic audio level for visualizer
   */
  public getAudioLevel(): number {
    if (!this.analyser || !this.frequencyData) return 0;
    this.analyser.getByteFrequencyData(this.frequencyData);
    let sum = 0;
    for (let i = 0; i < 16; i++) {
      sum += this.frequencyData[i];
    }
    return sum / (16 * 255);
  }
}

export const soundEngine = new SoundEngine();
