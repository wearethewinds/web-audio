class DomService {
    
    createNodeFromString (domString) {
        let domContainer = document.createElement('div');
        domContainer.innerHTML = domString;
        return domContainer.childNodes[0];
    }
    
};

module.exports = new DomService();