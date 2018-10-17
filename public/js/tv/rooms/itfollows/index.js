import {replaceContent} from '../../../utils/domUtils.js';
import {countdownTimer} from '../../../utils/countdownTimer.js';
import roomManagement from '../../components/roomManagement.js';
import gameplayManagement from './gameplayManagement.js';

const el = document.getElementById('app');
let gameplayManagementInst = null;
let roomManagementInst;
let gameWon = false;

const init = () => {
    initRoomManagement();
    
};

const initRoomManagement = () => {
    roomManagementInst = roomManagement({
        roomId: 'itFollows',
        onIdle,
        onAwaitingPlayers,
        onOccupied
    });
};

const onIdle = generatedCode => {
    gameplayManagementInst = null;
    replaceContent(el, `
        <h1>It Followsssssssssss</h1>
        Enter this code: <strong>${generatedCode}</strong>
    `);
};

const onAwaitingPlayers = generatedCode => {
    replaceContent(el, `
        <h1>Waiting...</h1>
        <p>Waiting for more players. Press start on your device when everyone's here.</p>
        Enter this code: <strong>${generatedCode}</strong>
    `);
};

const onOccupied = userInfo => {
    replaceContent(el, `
        <div class="js-gameplay"></div>
        <div class="js-countdown timer-wrapper"></div>
    `);
    const gameplayEl = el.querySelector('.js-gameplay');
    const countdownEl = el.querySelector('.js-countdown');
    gameplayManagementInst = gameplayManagement(gameplayEl, {
        onStartCallback: () => countdownTimer(countdownEl, 20, onDead),
        onWinCallback: onWin
    });
};

const onWin = () => {
    gameWon = true;
    replaceContent(el, `
        <div class="content-wrapper">
            <h1>You win!</h1>
        </div>
    `);
    if (gameplayManagementInst) {
        gameplayManagementInst.reset();
    }
    countdownTimer(null, 5, () => roomManagementInst.endSession());
};

const onDead = () => {
    if (gameWon === false) {
        replaceContent(el, `
            <div class="content-wrapper">
                <h1 class="dead">YOU'RE DEAD.</h1>
            </div>
        `);
    }
    if (gameplayManagementInst) {
        gameplayManagementInst.reset();
    }
};

init();
