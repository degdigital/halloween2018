import {replaceContent} from '../../../utils/domUtils.js';
import roomManagement from '../../components/roomManagement.js';
import roomOne from './roomOne.js';

const el = document.getElementById('app');
const roomOneInst = roomOne(el);
let roomManagementInst;

const init = () => {
    initRoomManagement();
};

const initRoomManagement = () => {
    roomManagementInst = roomManagement({
        roomId: 'hauntedHouse',
        onIdle,
        onAwaitingPlayers,
        onOccupied
    });
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
    roomOneInst.render(userInfo);
};

init();
