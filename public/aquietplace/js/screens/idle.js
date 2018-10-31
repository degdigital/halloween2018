import scenes from '../media/scenes.js';
import audioManager from '../media/audioManager.js';

function render({generatedCode, awaitingPlayers}) {
    const html = `
        <div class="idle flicker">
            <h1>A Quiet Place</h1>
            <p class="room-code">Room code: <strong>${generatedCode}</strong></p>
            ${renderAwaitingPlayers(awaitingPlayers)}
        </div>
    `;
    
    document.body.innerHTML = html;

    const audio = scenes.idle.audio;
    audioManager.play(audio.id, audio);
}

function renderAwaitingPlayers(awaitingPlayers) {
    return awaitingPlayers ? 
        `<p>Waiting for more players. Press start on your device when everyone's here.</p>` :
        '';
}

function destroy() {
    audioManager.stop();
}

function idle() {
    return {
        render,
        destroy
    };
}

export default idle();