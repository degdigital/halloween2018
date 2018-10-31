import audioDetector from '../detectors/audioDetector.js';
//import keyboardDetector from '../detectors/keyboardDetector.js';
import meter from '../components/meter.js';
import countdown from '../components/countdown.js';
import store from '../store.js';
import scenes from '../media/scenes.js';
import audioManager from '../media/audioManager.js';
import videoManager from '../media/videoManager.js';
import router from '../router.js';

const timeLimit = 30000;

let meterInst;
let countdownInst;
let detector;
let timeoutId;
let videoEl;
let endSessionCallback;

function render({endSession}) {
    endSessionCallback = endSession;

    store.setState({
        isGameScenePlaying: false,
        currentSeverity: 0
    });
    
    const html = `
        <video id="video" class="video" muted></video>
    `;
    
    document.body.innerHTML = html;

    videoEl = document.body.querySelector('#video');

    detector = audioDetector();
    detector.addListener(onDetect);

    playGameIdleScene();
    setTimeout(() => startGame(), 2000);
}

function playGameIdleScene() {
    const idleScene = scenes.gameIdle;
    videoManager.play(idleScene.video.id, videoEl, idleScene.video);
}

function onDetect(value) {
    const state = store.getState();

    if(state.isGameScenePlaying) {
        return;
    }
    
    meterInst.setValue(value);

    const severity = getSeverity(value);
    
    if(severity > 0 && severity > state.currentSeverity) {
        store.setState({ 
            isGameScenePlaying: true, 
            currentSeverity: severity
        });

        playScenesForSeverity(severity);
    }
}

function startGame() {
    meterInst = meter(document.body);
    countdownInst = countdown(document.body);
    countdownInst.start(timeLimit);
    detector.start();

    timeoutId = setTimeout(() => onTimeLimitReached(), timeLimit);

    document.addEventListener('keypress', onKeyPress);
}

function playGameGreenScene() {
    const scene = scenes.gameGreen;

    audioManager.play(scene.audio.id, scene.audio, onGameGreenAudioEnded);
    videoManager.play(scene.video.id, videoEl, scene.video);
}

function onGameGreenAudioEnded() {
    store.setState({ isGameScenePlaying: false });
}

function playGameYellowScene() {
    const scene = scenes.gameYellow1;

    audioManager.play(scene.audio.id, scene.audio);
    videoManager.play(scene.video.id, videoEl, scene.video, onGameYellowVideoEnded);
}

function onGameYellowVideoEnded() {
    store.setState({ isGameScenePlaying: false });

    const scene = scenes.gameYellow2;
    videoManager.play(scene.video.id, videoEl, scene.video);
}

function playGameRedScene() {
    const scene = scenes.gameRed;

    videoManager.play(scene.video.id, videoEl, scene.video, onGameRedVideoEnded);
    audioManager.play(scene.audio.id, scene.audio);

    setTimeout(() => {
        videoEl.classList.add('video--zoom');
        
    }, 3000);
}

function onGameRedVideoEnded() {
    endSessionCallback();
}

function playGameWinScene() {
    const html = `<div id="message" class="message">You Win!</div>`;
    document.body.insertAdjacentHTML('beforeEnd', html);

    const scene = scenes.gameWin;

    videoManager.play(scene.video.id, videoEl, scene.video, onGameWinVideoEnded);
    setTimeout(() => {
        document.getElementById('message').textContent = 'You Win?';
        audioManager.play(scene.audio.id, scene.audio);
    }, 3000);
}

function onGameWinVideoEnded() {
    endSessionCallback();
}

function winGame() {
    endGame();
    playGameWinScene();
}

function loseGame() {
    endGame();
    playGameRedScene();
}

function endGame() {
    clearTimeout(timeoutId);
    detector.stop();
    countdownInst.stop();
}

function onKeyPress() {
    winGame();
}

function onTimeLimitReached() {
    loseGame();   
}

function getSeverity(value) {
    return Math.ceil(value / 3);
}

function playScenesForSeverity(severity) {
    switch(severity) {
        case 1:
            playGameGreenScene();
            break;
        case 2:
            playGameYellowScene();
            break;
        case 3:
            loseGame();
            break;
    }
}

function destroy() {
    document.body.innerHTML = '';
   
    clearTimeout(timeoutId);
    detector.stop();
    countdownInst.stop();

    document.removeEventListener('keypress', onKeyPress);
}

function game() {


    return {
        render,
        destroy
    };
}

export default game();