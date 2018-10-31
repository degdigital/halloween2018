import store from '../store.js';

async function load() {
    const audioContext = new AudioContext();
    const audioFiles = store.getState().audioFiles;

    const loadedAudioFiles = await Promise.all(
       audioFiles.map(audioFile => loadAudioFile(audioFile, audioContext))
    );
    
    store.setState({audioFiles: loadedAudioFiles});
}

async function loadAudioFile(audioFile, audioContext) {
    const loadedAudioFile = {...audioFile};
    
    loadedAudioFile.data = await fetchAudioFile(audioFile.src, audioContext);
    
    return Promise.resolve(loadedAudioFile);
}

async function fetchAudioFile(source, audioContext) {
    const response = await fetch(source);
    const buffer = await response.arrayBuffer();
    return audioContext.decodeAudioData(buffer);
}

export default {
    load
};