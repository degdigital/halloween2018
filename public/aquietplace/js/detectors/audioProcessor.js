import { throttle } from '../utils.js';

let stream;
let processor;

async function start(onVolumeChangeCallback) {
    try {
        stream = await navigator.mediaDevices.getUserMedia({audio: true});

        const audioContext = new AudioContext();
        const mediaStreamSource = audioContext.createMediaStreamSource(stream);

        processor = audioContext.createScriptProcessor(512);
        processor.onaudioprocess = throttle(e => volumeAudioProcess(e, onVolumeChangeCallback), 100);
        processor.volume = 0;
        processor.clipLevel = 0.98;
        processor.averaging = 0.95;
        processor.clipLag = 750;

        // this will have no effect, since we don't copy the input to the output,
        // but works around a current Chrome bug.
        processor.connect(audioContext.destination);
        
        mediaStreamSource.connect(processor);
    } catch(e) {
        throw "Microphone: " + e.name + ". " + e.message;
    }
}

function stop() {
    processor.disconnect();
    if(stream) {
        stream.getTracks().forEach(track => track.stop());
    }
}

function volumeAudioProcess(e, onVolumeChangeCallback) {
    const buf = e.inputBuffer.getChannelData(0);

    const sum = buf.reduce((accumm, data) => {
        return accumm + data * data;
    }, 0);
  
    const rms =  Math.sqrt(sum / buf.length);

    const { volume, averaging } = e.target;

    const smoothedVolume = Math.max(rms, volume * averaging);
  
    onVolumeChangeCallback(smoothedVolume);      
}

function audioProcessor(onVolumeChangeCallback) {
    if (!navigator.mediaDevices) {
        throw "MediaDevices are not supported in this browser";
    }

    return {
        start: () => start(onVolumeChangeCallback),
        stop
    }
}

export default audioProcessor;