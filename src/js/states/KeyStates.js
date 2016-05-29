let activeKeys = {
    
};

let setState = (key, audio) => {
    if (activeKeys[key]) {
        return;
    }
    activeKeys[key] = audio;
};

let resetState = (key) => {
    let state = activeKeys[key];
    if (state && state.context) { 
        activeKeys[key].disconnect(state.context);
    }
    delete activeKeys[key];
}

let getState = key => {
  return activeKeys[key];  
};

module.exports = {
    getState: getState,
    resetState: resetState,
    setState: setState
};