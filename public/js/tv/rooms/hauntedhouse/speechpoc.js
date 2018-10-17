import {replaceContent} from '../../../utils/domUtils.js';
import roomManagement from '../../components/roomManagement.js';
import speech from '../../components/speech.js';

const el = document.getElementById('app');
const endGameTriggerClass = 'end-game-trigger';
let roomManagementInst;
let speechInst;

const init = () => {
    initRoomManagement();
    initSpeech();
    bindEvents();
};

const initRoomManagement = () => {
    roomManagementInst = roomManagement({
        roomId: 'hauntedHouse',
        onIdle,
        onAwaitingPlayers,
        onOccupied
    });
};

const initSpeech = () => {
    speechInst = speech();
};

const bindEvents = () => {
    document.addEventListener('click', () => {
        console.log('reset room timer example');
        roomManagementInst.resetTimer();
    });
    el.addEventListener('click', onClick);
};

const onClick = e => {
    const clickedEl = e.target;
    if (clickedEl.matches(`.${endGameTriggerClass}`)) {
        roomManagementInst.endSession();
    }
};

const onIdle = generatedCode => {
    replaceContent(el, `
        <h1>Welcome to Haunted House</h1>
        Enter this code: <strong>${generatedCode}</strong>
    `);
};

const onAwaitingPlayers = () => {
    replaceContent(el, `
        <h1>Waiting...</h1>
        <p>Waiting for more players. Press start on your device when everyone's here.</p>
    `);
};

const onOccupied = userInfo => {
    const userKeys = Object.keys(userInfo);
    const firstUser = userInfo[userKeys[0]];
    speechInst.speak(`Hello and welcome, ${firstUser.firstName}`);
    const firstNamesListItems = Object.keys(userInfo).reduce((output, key) => `
        <li>${userInfo[key].firstName}</li>
    `, '');
    replaceContent(el, `
        <h1>Haunted House ooohhhhhhhhhhhh</h1>
        <ul>
            ${firstNamesListItems}
        </ul>
        <button class="${endGameTriggerClass}">End game</button>
    `);
};

init();
