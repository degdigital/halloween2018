import audioFiles from './audioFiles.js';
import audioPlayer from './audioPlayer.js';
import mediaCache from './mediaCache.js';

function getAudioFile(id) {
    return audioFiles.find(audioFile => audioFile.id === id);
}

async function play(id, options={}, onEnded) {
    const audioFile = getAudioFile(id);
    if(audioFile) {
        const response = await mediaCache.getMediaAsset(audioFile.src);
        const buffer = await response.arrayBuffer();
        return audioPlayer.play(buffer, options, onEnded);
    } else {
        console.error('ERROR: Could not find audio ' + id);
    }
}

function stop() {
    audioPlayer.stop();
}

export default {
    play,
    stop
};