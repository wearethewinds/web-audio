

class SineService {
    
    constructor () {
        this.waveform  = 'sawtooth';
    }
    
    createSineNode (audioCtx, freq) {
        let oscillator = audioCtx.createOscillator();
        let gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = this.waveform; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
        oscillator.frequency.value = freq || 440;
        oscillator.start();
        return gainNode;
    }
    
    setWaveform (waveform) {
        if ((['sine', 'square', 'sawtooth', 'triangle'].indexOf(waveform) < 0)) {
            waveform = null;
        }
        this.waveform = waveform || 'sawtooth';
    }
    
}

module.exports = new SineService();