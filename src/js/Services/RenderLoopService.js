class RenderLoopService {
    
    constructor () {
        
        this.callbacks = [];
        this.loop();
        
    }
    
    addCallback (callback) {
        if (typeof callback === 'function') {
            this.callbacks.push(callback);    
        }
        
    }
    
    removeCallback (callback) {
        this.callbacks = this.callbacks.filter(cb => {
           return cb !== callback; 
        });
    }
    
    loop () {
        this.callbacks.forEach(cb => {
            cb();
        });
        requestAnimationFrame(this.loop.bind(this));
    }
    
    
};

module.exports = new RenderLoopService();