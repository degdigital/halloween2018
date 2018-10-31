function onKeyPress(e, listeners) {
    switch(e.key) {
        case '1':
            callListeners(listeners, 1);
            break;
        case '2':
            callListeners(listeners, 4);
            break;
        case '3':
            callListeners(listeners, 7);
            break;
    }
}

function callListeners(listeners, severityLevel) {
    listeners.forEach(listener => listener(severityLevel));
}

function keyboardDetector() {
    const listeners = [];

    document.addEventListener('keypress', e => onKeyPress(e, listeners)); 
    
    return {
        addListener: listener => listeners.push(listener)
    }
}

export default keyboardDetector;