import DomService from '../Services/DomService';

const template = '<div id="timeline"></div>';
const templateTimeLineLine = '<div class="timeline-line"></div>';
const templateTimeLineTimer = '<div class="timeline-line" id="timer"></div>';

class TimeLine {

    constructor () {
        this.html = DomService.createNodeFromString(template);
        this.fillUpLines();
        this.timer = DomService.createNodeFromString(templateTimeLineTimer);
        this.html.appendChild(this.timer);
    }

    fillUpLines () {
        for (let i = 0; i <= 12; ++i) {
            let html = DomService.createNodeFromString(templateTimeLineLine);
            this.html.appendChild(html);
        }
    }

    

    render () {
        return this.html;
    }

};

module.exports = TimeLine;