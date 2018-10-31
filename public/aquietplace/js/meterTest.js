import audioDetector from './audioDetector.js';

function initKeyboard(meterEl, dataOutputEls, detector) {
    document.addEventListener('keydown', e => {
        switch(e.key) {
            case 'ArrowRight':
                meterEl.value = Number(meterEl.value) + 1;
                break;
            case 'ArrowLeft':
                meterEl.value = Number(meterEl.value) - 1;
                break;
            case 'ArrowUp':
                detector.setMaxVolume(detector.getMaxVolume() + .05);
                updateDataOutputEl(detector.getMaxVolume(), dataOutputEls.maxVolume);
                break;
            case 'ArrowDown':
                detector.setMaxVolume(detector.getMaxVolume() - .05);
                updateDataOutputEl(detector.getMaxVolume(), dataOutputEls.maxVolume);
                break;
        }
    });
}

function onDetection(value, meterEl, dataOutputEls) {
    meterEl.value = value;

    updateDataOutputEl(value, dataOutputEls.volume);
}

function updateDataOutputEl(value, dataOutputEl) {
    dataOutputEl.textContent = Math.round(Number(value)*100)/100;
}

function meter() {
    const meterEl = document.getElementById('meter');
    const dataOutputEls = {
        volume: document.getElementById('volume-value'),
        maxVolume: document.getElementById('max-volume-value')
    };

    const detector = audioDetector();
    detector.addListener(value => onDetection(value, meterEl, dataOutputEls));

    initKeyboard(meterEl, dataOutputEls, detector);

    updateDataOutputEl(detector.getMaxVolume(), dataOutputEls.maxVolume);
}

export default meter();




