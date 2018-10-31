import audioPlayer from '../../media/audioPlayer.js';
import router from '../../router.js';
import script from './script.js';
import scenes from '../../media/scenes.js';
import audioManager from '../../media/audioManager.js';
import videoManager from '../../media/videoManager.js';

let introAudioIndex,
    endSessionCallback;

function render({endSession}) {
    endSessionCallback = endSession;
    
    const html = `
        <video id="video" class="video" muted>
            <source src="video/static.mp4" type="video/mp4; codecs=\"avc1.640028,mp4a.40.2\";" />
        </video>
        <div id="message" class="message"></div>
    `;
    
    document.body.innerHTML = html;

    const videoEl = document.querySelector('#video');
 
    videoManager.play(scenes.intro.video.id, videoEl, scenes.intro.video);
    audioManager.play(scenes.intro.audio.id, scenes.intro.audio)
        .then(audioIndex => {
            introAudioIndex = audioIndex;
            setTimeout(displayInstructions, 2000);  
        });  
}

function displayInstructions() {
    const messageEl = document.querySelector('#message');
    let scriptIndex = 0;

    displayInstructionsSegment(messageEl, scriptIndex);

    scheduleNextInstructionsSegment(messageEl, ++scriptIndex);
}

function scheduleNextInstructionsSegment(messageEl, scriptIndex) {
    if(scriptIndex < script.length) {
        setTimeout(() => {
            messageEl.innerHTML = '';

            setTimeout(() => {
                displayInstructionsSegment(messageEl, scriptIndex);

                if(scriptIndex === script.length - 1) {
                    transitionOut(messageEl);
                }

                scheduleNextInstructionsSegment(messageEl, ++scriptIndex);
            }, 500)
           
        }, 5000);
    }
}

function displayInstructionsSegment(messageEl, scriptIndex) {
    const html = script[scriptIndex]
        .map(line => `<p>${line}</p>`)
        .join('');

    messageEl.innerHTML = html;

    audioManager.play('boom');
}

function transitionOut(messageEl) {
    audioPlayer.setVolume(introAudioIndex, .75, 6, 1);

    const videoEl = document.querySelector('#video');

    videoEl.classList.add('brighten');
    videoEl.style = 'animation-duration: 5s;animation-delay: 2s;';

    messageEl.classList.add('message--fade');
    messageEl.style = 'transition-duration: 5s;transition-delay: 2s;';
    
    setTimeout(routeToGame, 5000);
}

function routeToGame() {
    router.route('game', {endSession: endSessionCallback});
}

function destroy() {
    audioPlayer.stop();

    document.body.innerHTML = '';
}

function intro() {
    return {
        render,
        destroy
    };
}

export default intro();