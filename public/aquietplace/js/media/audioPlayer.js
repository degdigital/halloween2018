let audioContext = null;

const sounds = [];

function createAudioContext() {
    return new AudioContext();
}

function createGainNode(volume, node) {
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(node);
    return gainNode;
}

function createBufferSource(data, loop, node) {
    const bufferSource = audioContext.createBufferSource();
    bufferSource.buffer = data;
    bufferSource.loop = loop;
    bufferSource.playbackRate.value = 1.0;
    bufferSource.connect(node);
    return bufferSource;
}

async function play(buffer, {loop=false, volume=1}, endedCallback) {
    if(audioContext === null) {
        audioContext = createAudioContext();
    }

    const data = await audioContext.decodeAudioData(buffer);

    const gainNode = createGainNode(volume, audioContext.destination);
    const bufferSource = createBufferSource(data, loop, gainNode);
    
    sounds.push({
        bufferSource,
        gainNode
    });
    
    if(endedCallback) {
        const endedHandler = () => {
            bufferSource.removeEventListener('ended', endedHandler);
            endedCallback();
        };

        bufferSource.addEventListener('ended', endedHandler);
    }
    
    bufferSource.start(0);

    return sounds.length - 1;
}

function stop() {
    sounds.forEach(({bufferSource, gainNode}) => {
        bufferSource.stop();
        bufferSource.disconnect();
        gainNode.disconnect();
    });

}

function getSound(index) {
    if(index < 0 || index >= sounds.length) {
        return null;
    }
    return sounds[index];
}

function setVolume(soundIndex, volume, transitionTime = 0, delay = 0) {
    const sound = getSound(soundIndex);
    
    if(sound !== null) {
        sound.gainNode.gain.setTargetAtTime(volume, audioContext.currentTime + delay, transitionTime);
    }
}

const audioPlayer = {
    play,
    stop,
    setVolume
};

export default audioPlayer;