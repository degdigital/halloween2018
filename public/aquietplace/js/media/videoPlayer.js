/*function play(videoEl, {src, loop}) {
    videoEl.src = src;
    videoEl.loop = loop;
    videoEl.play();
}*/
const mimeCodec = 'video/mp4; codecs="avc1.640028, mp4a.40.2"';

function play(videoEl, buffer,  {loop}, endedCallback) {
    const mediaSource = new MediaSource();
    videoEl.loop = loop;
    videoEl.src = URL.createObjectURL(mediaSource);

    const onSourceOpenBound = () => {
        mediaSource.removeEventListener('sourceopen', onSourceOpenBound);
        onSourceOpen(mediaSource, videoEl, buffer, endedCallback);
    }

    mediaSource.addEventListener('sourceopen', onSourceOpenBound);
}

function onSourceOpen(mediaSource, videoEl, buffer, endedCallback) {
    const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

    const onUpdateEndBound = () => {
        sourceBuffer.removeEventListener('updateend', onUpdateEndBound);
        mediaSource.endOfStream();
        videoEl.play();
        if(endedCallback) {
            videoEl.addEventListener('ended', endedCallback);
        }
    };
 
    sourceBuffer.addEventListener('updateend', onUpdateEndBound);
    sourceBuffer.appendBuffer(buffer);
}

const videoPlayer = {
    play
};

export default videoPlayer;