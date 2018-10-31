import videoFiles from './videoFiles.js';
import videoPlayer from './videoPlayer.js';
import mediaCache from './mediaCache.js';

function getVideoFile(id) {
    return videoFiles.find(videoFile => videoFile.id === id);
}

async function play(id, videoEl, options={}, onEnded) {
    const videoFile = getVideoFile(id);
    if(videoFile) {
        const response = await mediaCache.getMediaAsset(videoFile.src);
        const buffer = await response.arrayBuffer();
        videoPlayer.play(videoEl, buffer, options, onEnded);
    } else {
        console.error('ERROR: Could not find video ' + id);
    }
}

export default {
    play
};