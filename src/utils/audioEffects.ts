/**
 * Web Audio API Acoustic Feedback System
 * Generates ultra-premium, dynamic organic micro-tones (Haptic tick/pop/chime)
 * without loading any heavy external audio files. High-performance and client-side.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a delicate mechanical/digital micro-tick (pleasant UI feedback)
 */
export function playMicroTick(pitchMultiplier = 1) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create nodes
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    // Triangle wave for smooth, wood-like tick tone
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400 * pitchMultiplier, now);
    osc.frequency.exponentialRampToValueAtTime(100 * pitchMultiplier, now + 0.05);
    
    // Very fast decay envelope (50ms)
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    
    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    // Graceful fallback if audio context blocked/unsupported
  }
}

/**
 * Play an organic water-droplet / wooden pop sound (used for selector toggles)
 */
export function playOrganicPop(pitchMultiplier = 1) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600 * pitchMultiplier, now);
    osc.frequency.exponentialRampToValueAtTime(300 * pitchMultiplier, now + 0.08);
    
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    
    osc.start(now);
    osc.stop(now + 0.09);
  } catch (e) {
    // Graceful fallback
  }
}

/**
 * Play a lush, modern success chime (for successful copy actions or report generation)
 */
export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Play a lovely double-tone chime (major third chord: C6 and E6)
    const playTone = (freq: number, delay: number, vol = 0.03) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(vol, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.25);
      
      osc.start(now + delay);
      osc.stop(now + delay + 0.3);
    };
    
    playTone(1046.50, 0);       // C6
    playTone(1318.51, 0.05);    // E6
  } catch (e) {
    // Graceful fallback
  }
}
