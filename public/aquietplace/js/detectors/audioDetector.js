import audioProcessor from './audioProcessor.js';

const defaultMaxVolume = .25;

function convertVolume(volume, maxVolume) {
    const convertedValue = Math.round((volume/maxVolume) * 9);
    return Math.min(convertedValue, 9);
}

function initAudioProcessor(listeners, settings) {
    return audioProcessor(volume => onVolumeChange(volume, listeners, settings));
}

function start(audioProcessorInst) {
    audioProcessorInst.start();
}

function stop(audioProcessorInst) {
    audioProcessorInst.stop();
}

function onVolumeChange(volume, listeners, settings) {
    const convertedVolume = convertVolume(volume, settings.maxVolume); 

    listeners.forEach(listener => listener(convertedVolume));
}

function setMaxVolume(maxVolume, settings) {
    settings.maxVolume = Math.max(maxVolume, 0);
}

function audioDetector() {
    
    const listeners = [];
    const settings = {
        maxVolume: defaultMaxVolume
    };

    const audioProcessorInst = initAudioProcessor(listeners, settings);
    
    return {
        addListener: listener => listeners.push(listener),
        start: () => start(audioProcessorInst),
        stop: () => stop(audioProcessorInst),
        getMaxVolume: () => settings.maxVolume,
        setMaxVolume: maxVolume => setMaxVolume(maxVolume, settings)
    }
}

export default audioDetector;