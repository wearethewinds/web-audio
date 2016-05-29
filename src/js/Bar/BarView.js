const notes = {
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

let blockState = {

};


class BarView {

    constructor (bar) {
        this.bar = bar || null;
    }

    setBar (bar) {
        this.bar = bar; 
    }

    render () {
        let bar = document.createElement('div');
        bar.className = 'bar';
        for (let i = 0; i <= 12; ++i) {
            let line = document.createElement('div');
            line.className = 'line';
            bar.appendChild(line);
        }
        this.bar.blocks.forEach(barBlock => {
           Object.keys(notes).forEach(note => {
              let block = document.createElement('div');
               block.className = 'block';
               if (note in barBlock.state) {
                   if (barBlock.state[note].start) {
                       block.className += ' start';
                       blockState[note] = true;
                   }
                   else if (barBlock.state[note].stop) {
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
        return  bar;
    }

}

module.exports = BarView;