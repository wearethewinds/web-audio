class LaneOptions {
    
    constructor(html) {
        this.html = html;
        html.querySelector('.record-button').onclick = e => {
            console.log('record');
        }
    }
    
}

module.exports = LaneOptions;