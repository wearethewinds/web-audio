import BarView from './BarView';

class Bar {
    
    constructor() {
        this.blocks = [];
        this.view = new BarView(this);
    }

    setBlock(block) {
        this.blocks.push(block);
    }
    
    render () {
        return this.view.render();
    }
    
}


module.exports = Bar;