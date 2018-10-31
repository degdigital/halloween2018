import router from './router.js';
import mediaCache from './media/mediaCache.js';
import audioFiles from './media/audioFiles.js';
import videoFiles from './media/videoFiles.js';
import roomManagement from '../../js/tv/components/roomManagement.js';

let roomManagementInst;

function initRoomManagement() {
    roomManagementInst = roomManagement({
        roomId: 'quietPlace',
        onIdle,
        onAwaitingPlayers,
        onOccupied
    });
}

function onIdle(generatedCode) {
    router.route('idle', { generatedCode });
}

function onAwaitingPlayers(generatedCode) {
    router.route('idle', { generatedCode, awaitingPlayers: true });
}

function onOccupied() {
    router.route('intro', {endSession});
}

function endSession() {
    roomManagementInst.endSession();
}

async function main() {
    router.route('loader');

    const mediaUrls = [...audioFiles, ...videoFiles].map(file => file.src);
    await mediaCache.cacheMediaAssets(mediaUrls);

    initRoomManagement();
}

export default main();