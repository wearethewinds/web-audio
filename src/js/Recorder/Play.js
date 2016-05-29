import DomService from '../Services/DomService';
import RenderLoopService from '../Services/RenderLoopService';

const template = '<button>&#9658;</button>';

class Play {

    constructor (onPlay) {
        this.html = DomService.createNodeFromString(template);
        this.isPlaying = false;
        this.html.onclick = e => {
            if (this.isPlaying) {
                RenderLoopService.removeCallback(onPlay);
            } else {
                RenderLoopService.addCallback(onPlay);
            }
            this.isPlaying = !this.isPlaying;
        }
    }

    render () {
        return this.html;
    }

}

module.exports = Play;