import Lane from './Lane'
import TimeLine from './TimeLine';
import PlayButton from './Play';

const template = '<div id="recorder"></div>';

class Recorder {
    
    constructor(root) {
        this.html = root;
        root.innerHTML = template;
        this.lanes = [];
        this.renderTimeLine();
        this.buildLanes();
        this.renderPlayButton();
    }
    
    buildLanes () {
        for(let i = 0; i <= 3; ++i) {
            let lane = new Lane();
            this.lanes.push(lane);
            this.html.querySelector('#recorder').appendChild(lane.render());
        }
    }

    renderTimeLine () {
        this.timeline = new TimeLine();
        this.html.querySelector('#recorder').appendChild(this.timeline.render());
    }

    renderPlayButton () {
        this.playButton = new PlayButton(this.onPlay.bind(this));
        this.html.querySelector('#recorder').appendChild(this.playButton.render());
    }

    onPlay () {
        let tickOffset = 0.78125;
        let currentLeft = (parseFloat(this.timeline.timer.style.left) || 0) + tickOffset;
        this.timeline.timer.style.left = currentLeft + 'px';
    };
    
}

module.exports = Recorder;