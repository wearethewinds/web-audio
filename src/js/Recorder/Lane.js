import LaneOptions from './LaneOptions';
import DomService from '../Services/DomService';

const template = '<div class="lane"><div class="options"><button class="record-button">•</button></div><div class="trackcontainer"></div></div>';

class Lane {

    constructor() {
        this.html = DomService.createNodeFromString(template);
        this.options = new LaneOptions(this.html.querySelector('.options'));
    }
    
    render () {
        return this.html;
    }

}

module.exports = Lane;