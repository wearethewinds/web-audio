import KeyStates from './states/KeyStates';

import Bar from './Bar/Bar';
import Block from './Bar/Block';
import SineService from './Services/SineService';
import Recorder from './Recorder/Recorder';

const tempo = 112.5;

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let waveform = 'sawtooth';

const keys = {
    KeyA: 261.63, // C
    KeyW: 277.18, // C#
    KeyS: 293.66, // D
    KeyE: 311.13, // D#
    KeyD: 329.63, // E
    KeyF: 349.23, // F
    KeyT: 369.99, // F#
    KeyG: 392.00, // G
    KeyY: 415.30, // G#
    KeyH: 440.00, // A
    KeyU: 466.16, // A#
    KeyJ: 493.88, // B
    KeyK: 523.25 // C
};


let recordButton = document.querySelector('.record');
let replayButton = document.querySelector('.replay');
let recordHandler = null;
let currentBlock = null;
let bar = null;
let record = () => {
    if (currentBlock !== null && bar !== null) {
        bar.setBlock(currentBlock);
    }
    currentBlock = new Block();
    recordHandler = requestAnimationFrame(record);
};

let recorder =new Recorder(document.querySelector('#record-container'));

recordButton.onclick = e => {
    if (recordHandler) {
        cancelAnimationFrame(recordHandler);
        recordButton.style.backgroundColor = null;
        currentBlock = null;
        document.querySelector('#bar-container').appendChild(bar.render());
        return;
    }
    bar = new Bar();
    setTimeout(() => {
        recordButton.style.backgroundColor = '#A80000';
        record();
    }, 1000);
};

replayButton.onclick = e => {
    let i = 0;
    let playState = null;
    let play = () => {
        if (bar.blocks.length <= i) {
            cancelAnimationFrame(playState);
            return;
        }
        let block = bar.blocks[i++];
        Object.keys(block.state).forEach(note => {
            if (block.state[note].start) {
                let node = SineService.createSineNode(audioCtx, keys[note]);
                KeyStates.setState(note, node);
                let pianoKey = document.querySelector('#' + note);
                if (pianoKey) {
                    pianoKey.style.backgroundColor = '#a84400';
                }
            }
            if (block.state[note].stop) {
                KeyStates.resetState(note);
                let pianoKey = document.querySelector('#' + note);
                if (pianoKey) {
                    pianoKey.style.backgroundColor = null;
                }
            }
        });
        requestAnimationFrame(play);
    };
    if (!bar) {
        console.log('no record');
        return;
    }
    play();
};

document.onkeydown = (e) => {
    let key = e.code;
    if (!(key in keys) || KeyStates.getState(key)) {
        return;
    }
    if (currentBlock !== null) {
        currentBlock.state[key] = {
            start: true
        };
    }
    let node = SineService.createSineNode(audioCtx, keys[key]);
    KeyStates.setState(key, node);
    let pianoKey = document.querySelector('#' + key);
    if (pianoKey) {
        pianoKey.style.backgroundColor = '#a84400';
    }
};

document.onkeyup = (e) => {
    let key = e.code;
    if (currentBlock !== null) {
        currentBlock.state[key] = {
            stop: true
        };
    }
    KeyStates.resetState(key);
    let pianoKey = document.querySelector('#' + key);
    if (pianoKey) {
        pianoKey.style.backgroundColor = null;
    }
};

Array.prototype.forEach.call(document.querySelectorAll('#waveforms li'), waveformNode => {
    waveformNode.onclick = e => {
        SineService.setWaveform(e.target.getAttribute('data-waveform'));
    }
});

Array.prototype.forEach.call(document.querySelectorAll('.white, .black'), key => {
    key.onmousedown = (ev) => {
        ev.stopPropagation();
        let id = key.getAttribute('id');
        let e = new KeyboardEvent("keydown", {bubbles: false, cancelable: true, code: id});
        document.dispatchEvent(e);
    }
    key.onmouseup = (ev) => {
        ev.stopPropagation();
        let id = key.getAttribute('id');
        let e = new KeyboardEvent("keyup", {bubbles: false, cancelable: true, code: id});
        document.dispatchEvent(e);
    }

});