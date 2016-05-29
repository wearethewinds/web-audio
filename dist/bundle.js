(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BarView = require('./BarView');

var _BarView2 = _interopRequireDefault(_BarView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bar = function () {
    function Bar() {
        _classCallCheck(this, Bar);

        this.blocks = [];
        this.view = new _BarView2.default(this);
    }

    _createClass(Bar, [{
        key: 'setBlock',
        value: function setBlock(block) {
            this.blocks.push(block);
        }
    }, {
        key: 'render',
        value: function render() {
            return this.view.render();
        }
    }]);

    return Bar;
}();

module.exports = Bar;

},{"./BarView":2}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var notes = {
    KeyA: 0, // C
    KeyW: 1, // C#
    KeyS: 2, // D
    KeyE: 3, // D#
    KeyD: 4, // E
    KeyF: 5, // F
    KeyT: 6, // F#
    KeyG: 7, // G
    KeyY: 8, // G#
    KeyH: 9, // A
    KeyU: 10, // A#
    KeyJ: 11, // B
    KeyK: 12 // C
};

var blockState = {};

var BarView = function () {
    function BarView(bar) {
        _classCallCheck(this, BarView);

        this.bar = bar || null;
    }

    _createClass(BarView, [{
        key: 'setBar',
        value: function setBar(bar) {
            this.bar = bar;
        }
    }, {
        key: 'render',
        value: function render() {
            var bar = document.createElement('div');
            bar.className = 'bar';
            for (var i = 0; i <= 12; ++i) {
                var line = document.createElement('div');
                line.className = 'line';
                bar.appendChild(line);
            }
            this.bar.blocks.forEach(function (barBlock) {
                Object.keys(notes).forEach(function (note) {
                    var block = document.createElement('div');
                    block.className = 'block';
                    if (note in barBlock.state) {
                        if (barBlock.state[note].start) {
                            block.className += ' start';
                            blockState[note] = true;
                        } else if (barBlock.state[note].stop) {
                            block.className += ' stop';
                            delete blockState[note];
                        }
                    }
                    if (note in blockState) {
                        block.className += ' interconnected';
                    }
                    bar.childNodes[notes[note]].appendChild(block);
                });
            });
            return bar;
        }
    }]);

    return BarView;
}();

module.exports = BarView;

},{}],3:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
of kind
    {
        A4: {
            start: true
        }
        B4: {
            stop: true
        }
    }
 */

var Block = function Block() {
    _classCallCheck(this, Block);

    this.state = {};
};

module.exports = Block;

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LaneOptions = require('./LaneOptions');

var _LaneOptions2 = _interopRequireDefault(_LaneOptions);

var _DomService = require('../Services/DomService');

var _DomService2 = _interopRequireDefault(_DomService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var template = '<div class="lane"><div class="options"><button class="record-button">•</button></div><div class="trackcontainer"></div></div>';

var Lane = function () {
    function Lane() {
        _classCallCheck(this, Lane);

        this.html = _DomService2.default.createNodeFromString(template);
        this.options = new _LaneOptions2.default(this.html.querySelector('.options'));
    }

    _createClass(Lane, [{
        key: 'render',
        value: function render() {
            return this.html;
        }
    }]);

    return Lane;
}();

module.exports = Lane;

},{"../Services/DomService":9,"./LaneOptions":5}],5:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LaneOptions = function LaneOptions(html) {
    _classCallCheck(this, LaneOptions);

    this.html = html;
    html.querySelector('.record-button').onclick = function (e) {
        console.log('record');
    };
};

module.exports = LaneOptions;

},{}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DomService = require('../Services/DomService');

var _DomService2 = _interopRequireDefault(_DomService);

var _RenderLoopService = require('../Services/RenderLoopService');

var _RenderLoopService2 = _interopRequireDefault(_RenderLoopService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var template = '<button>&#9658;</button>';

var Play = function () {
    function Play(onPlay) {
        var _this = this;

        _classCallCheck(this, Play);

        this.html = _DomService2.default.createNodeFromString(template);
        this.isPlaying = false;
        this.html.onclick = function (e) {
            if (_this.isPlaying) {
                _RenderLoopService2.default.removeCallback(onPlay);
            } else {
                _RenderLoopService2.default.addCallback(onPlay);
            }
            _this.isPlaying = !_this.isPlaying;
        };
    }

    _createClass(Play, [{
        key: 'render',
        value: function render() {
            return this.html;
        }
    }]);

    return Play;
}();

module.exports = Play;

},{"../Services/DomService":9,"../Services/RenderLoopService":10}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Lane = require('./Lane');

var _Lane2 = _interopRequireDefault(_Lane);

var _TimeLine = require('./TimeLine');

var _TimeLine2 = _interopRequireDefault(_TimeLine);

var _Play = require('./Play');

var _Play2 = _interopRequireDefault(_Play);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var template = '<div id="recorder"></div>';

var Recorder = function () {
    function Recorder(root) {
        _classCallCheck(this, Recorder);

        this.html = root;
        root.innerHTML = template;
        this.lanes = [];
        this.renderTimeLine();
        this.buildLanes();
        this.renderPlayButton();
    }

    _createClass(Recorder, [{
        key: 'buildLanes',
        value: function buildLanes() {
            for (var i = 0; i <= 3; ++i) {
                var lane = new _Lane2.default();
                this.lanes.push(lane);
                this.html.querySelector('#recorder').appendChild(lane.render());
            }
        }
    }, {
        key: 'renderTimeLine',
        value: function renderTimeLine() {
            this.timeline = new _TimeLine2.default();
            this.html.querySelector('#recorder').appendChild(this.timeline.render());
        }
    }, {
        key: 'renderPlayButton',
        value: function renderPlayButton() {
            this.playButton = new _Play2.default(this.onPlay.bind(this));
            this.html.querySelector('#recorder').appendChild(this.playButton.render());
        }
    }, {
        key: 'onPlay',
        value: function onPlay() {
            var tickOffset = 0.78125;
            var currentLeft = (parseFloat(this.timeline.timer.style.left) || 0) + tickOffset;
            this.timeline.timer.style.left = currentLeft + 'px';
        }
    }]);

    return Recorder;
}();

module.exports = Recorder;

},{"./Lane":4,"./Play":6,"./TimeLine":8}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DomService = require('../Services/DomService');

var _DomService2 = _interopRequireDefault(_DomService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var template = '<div id="timeline"></div>';
var templateTimeLineLine = '<div class="timeline-line"></div>';
var templateTimeLineTimer = '<div class="timeline-line" id="timer"></div>';

var TimeLine = function () {
    function TimeLine() {
        _classCallCheck(this, TimeLine);

        this.html = _DomService2.default.createNodeFromString(template);
        this.fillUpLines();
        this.timer = _DomService2.default.createNodeFromString(templateTimeLineTimer);
        this.html.appendChild(this.timer);
    }

    _createClass(TimeLine, [{
        key: 'fillUpLines',
        value: function fillUpLines() {
            for (var i = 0; i <= 12; ++i) {
                var html = _DomService2.default.createNodeFromString(templateTimeLineLine);
                this.html.appendChild(html);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return this.html;
        }
    }]);

    return TimeLine;
}();

;

module.exports = TimeLine;

},{"../Services/DomService":9}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomService = function () {
    function DomService() {
        _classCallCheck(this, DomService);
    }

    _createClass(DomService, [{
        key: 'createNodeFromString',
        value: function createNodeFromString(domString) {
            var domContainer = document.createElement('div');
            domContainer.innerHTML = domString;
            return domContainer.childNodes[0];
        }
    }]);

    return DomService;
}();

;

module.exports = new DomService();

},{}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RenderLoopService = function () {
    function RenderLoopService() {
        _classCallCheck(this, RenderLoopService);

        this.callbacks = [];
        this.loop();
    }

    _createClass(RenderLoopService, [{
        key: 'addCallback',
        value: function addCallback(callback) {
            if (typeof callback === 'function') {
                this.callbacks.push(callback);
            }
        }
    }, {
        key: 'removeCallback',
        value: function removeCallback(callback) {
            this.callbacks = this.callbacks.filter(function (cb) {
                return cb !== callback;
            });
        }
    }, {
        key: 'loop',
        value: function loop() {
            this.callbacks.forEach(function (cb) {
                cb();
            });
            requestAnimationFrame(this.loop.bind(this));
        }
    }]);

    return RenderLoopService;
}();

;

module.exports = new RenderLoopService();

},{}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SineService = function () {
    function SineService() {
        _classCallCheck(this, SineService);

        this.waveform = 'sawtooth';
    }

    _createClass(SineService, [{
        key: 'createSineNode',
        value: function createSineNode(audioCtx, freq) {
            var oscillator = audioCtx.createOscillator();
            var gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.type = this.waveform; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
            oscillator.frequency.value = freq || 440;
            oscillator.start();
            return gainNode;
        }
    }, {
        key: 'setWaveform',
        value: function setWaveform(waveform) {
            if (['sine', 'square', 'sawtooth', 'triangle'].indexOf(waveform) < 0) {
                waveform = null;
            }
            this.waveform = waveform || 'sawtooth';
        }
    }]);

    return SineService;
}();

module.exports = new SineService();

},{}],12:[function(require,module,exports){
'use strict';

var _KeyStates = require('./states/KeyStates');

var _KeyStates2 = _interopRequireDefault(_KeyStates);

var _Bar = require('./Bar/Bar');

var _Bar2 = _interopRequireDefault(_Bar);

var _Block = require('./Bar/Block');

var _Block2 = _interopRequireDefault(_Block);

var _SineService = require('./Services/SineService');

var _SineService2 = _interopRequireDefault(_SineService);

var _Recorder = require('./Recorder/Recorder');

var _Recorder2 = _interopRequireDefault(_Recorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tempo = 112.5;

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var waveform = 'sawtooth';

var keys = {
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

var recordButton = document.querySelector('.record');
var replayButton = document.querySelector('.replay');
var recordHandler = null;
var currentBlock = null;
var bar = null;
var record = function record() {
    if (currentBlock !== null && bar !== null) {
        bar.setBlock(currentBlock);
    }
    currentBlock = new _Block2.default();
    recordHandler = requestAnimationFrame(record);
};

var recorder = new _Recorder2.default(document.querySelector('#record-container'));

recordButton.onclick = function (e) {
    if (recordHandler) {
        cancelAnimationFrame(recordHandler);
        recordButton.style.backgroundColor = null;
        currentBlock = null;
        document.querySelector('#bar-container').appendChild(bar.render());
        return;
    }
    bar = new _Bar2.default();
    setTimeout(function () {
        recordButton.style.backgroundColor = '#A80000';
        record();
    }, 1000);
};

replayButton.onclick = function (e) {
    var i = 0;
    var playState = null;
    var play = function play() {
        if (bar.blocks.length <= i) {
            cancelAnimationFrame(playState);
            return;
        }
        var block = bar.blocks[i++];
        Object.keys(block.state).forEach(function (note) {
            if (block.state[note].start) {
                var node = _SineService2.default.createSineNode(audioCtx, keys[note]);
                _KeyStates2.default.setState(note, node);
                var pianoKey = document.querySelector('#' + note);
                if (pianoKey) {
                    pianoKey.style.backgroundColor = '#a84400';
                }
            }
            if (block.state[note].stop) {
                _KeyStates2.default.resetState(note);
                var _pianoKey = document.querySelector('#' + note);
                if (_pianoKey) {
                    _pianoKey.style.backgroundColor = null;
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

document.onkeydown = function (e) {
    var key = e.code;
    if (!(key in keys) || _KeyStates2.default.getState(key)) {
        return;
    }
    if (currentBlock !== null) {
        currentBlock.state[key] = {
            start: true
        };
    }
    var node = _SineService2.default.createSineNode(audioCtx, keys[key]);
    _KeyStates2.default.setState(key, node);
    var pianoKey = document.querySelector('#' + key);
    if (pianoKey) {
        pianoKey.style.backgroundColor = '#a84400';
    }
};

document.onkeyup = function (e) {
    var key = e.code;
    if (currentBlock !== null) {
        currentBlock.state[key] = {
            stop: true
        };
    }
    _KeyStates2.default.resetState(key);
    var pianoKey = document.querySelector('#' + key);
    if (pianoKey) {
        pianoKey.style.backgroundColor = null;
    }
};

Array.prototype.forEach.call(document.querySelectorAll('#waveforms li'), function (waveformNode) {
    waveformNode.onclick = function (e) {
        _SineService2.default.setWaveform(e.target.getAttribute('data-waveform'));
    };
});

Array.prototype.forEach.call(document.querySelectorAll('.white, .black'), function (key) {
    key.onmousedown = function (ev) {
        ev.stopPropagation();
        var id = key.getAttribute('id');
        var e = new KeyboardEvent("keydown", { bubbles: false, cancelable: true, code: id });
        document.dispatchEvent(e);
    };
    key.onmouseup = function (ev) {
        ev.stopPropagation();
        var id = key.getAttribute('id');
        var e = new KeyboardEvent("keyup", { bubbles: false, cancelable: true, code: id });
        document.dispatchEvent(e);
    };
});

},{"./Bar/Bar":1,"./Bar/Block":3,"./Recorder/Recorder":7,"./Services/SineService":11,"./states/KeyStates":13}],13:[function(require,module,exports){
"use strict";

var activeKeys = {};

var setState = function setState(key, audio) {
    if (activeKeys[key]) {
        return;
    }
    activeKeys[key] = audio;
};

var resetState = function resetState(key) {
    var state = activeKeys[key];
    if (state && state.context) {
        activeKeys[key].disconnect(state.context);
    }
    delete activeKeys[key];
};

var getState = function getState(key) {
    return activeKeys[key];
};

module.exports = {
    getState: getState,
    resetState: resetState,
    setState: setState
};

},{}]},{},[12]);
