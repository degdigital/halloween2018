import {replaceContent} from '../../utils/domUtils.js';
import itFollows from '../rooms/itFollows.js';
import quietPlace from '../rooms/quietPlace.js';

const roomManagement = el => {

    const roomManagementRef = firebase.app().database().ref('roomManagement');
    const roomIdAttr = 'data-roomid';
    const joinWaitingRoomTriggerClass = 'enter-waiting-trigger';
    const startTriggerClass = 'start-trigger';
    const codeEnterFormClass = 'enter-code-form';
    const codeEnterFormCancelTriggerClass = 'enter-code-form-cancel';
    const roomStatuses = {
        unavailable: 'unavailable',
        idle: 'idle',
        awaitingPlayers: 'awaitingPlayers',
        occupied: 'occupied'
    };
    let roomsInfo = null;
    let currentRoom = null;
    let roomsInstances;

    const init = async userInfo => {
        roomsInfo = await roomManagementRef.once('value').then(snapshot => snapshot.val());
        initRooms(userInfo);
        bindEvents(userInfo);
    };

    const initRooms = userInfo => {
        const instanceSettings = {
            userInfo,
            onEnd
        };
        roomsInstances = {
            itFollows: itFollows(el, { 
                ...instanceSettings,
                roomId: 'itFollows'
            }),
            quietPlace: quietPlace(el, { 
                ...instanceSettings,
                roomId: 'quietPlace'
            })
        };

        
    };

    const bindEvents = userInfo => {
        roomManagementRef.on('value', snapshot => {
            roomsInfo = snapshot.val();
            if (currentRoom === null) {
                renderSelectionScreen();
            }
        });
        Object.keys(roomsInstances).forEach(roomId => {
            roomManagementRef.child(`${roomId}`).on('child_changed', snapshot => onStatusChange(snapshot.key, snapshot.val(), roomId));
        });
        el.addEventListener('click', e => onClick(e, userInfo));
        el.addEventListener('submit', e => onsubmit(e, userInfo));
    };

    const onClick = (e, userInfo) => {
        const clickedEl = e.target;
        const roomId = clickedEl.getAttribute(roomIdAttr);
        if (clickedEl.matches(`.${joinWaitingRoomTriggerClass}`)) {
            // joinWaiting(roomId, userInfo);
            renderCodeEnterScreen(roomId);
        }
        if (clickedEl.matches(`.${startTriggerClass}`)) {
            joinRoom(roomId);
        }
        if (clickedEl.matches(`.${codeEnterFormCancelTriggerClass}`)) {
            e.preventDefault();
            renderSelectionScreen();
            currentRoom = null;
        }
    };

    const onsubmit = async (e, userInfo) => {
        const formEl = e.target;
        if (formEl.matches(`.${codeEnterFormClass}`)) {

            e.preventDefault();
            const roomId = formEl.getAttribute(roomIdAttr);
            const enteredCode = [...formEl.elements][0].value;
            const roomVals = await roomManagementRef.child(roomId).once('value').then(snapshot => snapshot.val());
            if (roomVals.code && roomVals.code.toString() === enteredCode) {
                joinWaiting(roomId, userInfo);
            } else {
                alert('The code you entered is incorrect.');
            }
        }
    };

    const onStatusChange = (key, value, roomId) => {
        if (key === 'status') {
            if (value === roomStatuses.idle) {
                currentRoom = null;
                renderSelectionScreen();
            }
            if (value === roomStatuses.awaitingPlayers && currentRoom === roomId) {
                renderWaitingScreen(roomId);
            }
            if (value === roomStatuses.occupied && currentRoom === roomId) {
                renderRoomScreen(roomId);
            }
        }
    };

    const onEnd = roomId => {
        roomManagementRef.child(roomId).update({
            status: roomStatuses.idle,
            users: null
        });
    };

    const joinWaiting = (roomId, userInfo) => {
        currentRoom = roomId;
        roomManagementRef.child(roomId).transaction(currentState => {
            if (currentState) {
                const currentUserData = currentState.users || {};
                // const newUserKey = roomManagementRef.child(`${roomId}/users`).push().key;
                const newUserKey = userInfo.key;
                if (currentState.status === roomStatuses.awaitingPlayers) {
                    renderWaitingScreen(roomId);
                }
                return {
                    ...currentState,
                    status: roomStatuses.awaitingPlayers,
                    users: {
                        ...currentUserData,
                        [newUserKey]: true
                    }
                };
            }
        });
        
    };

    const joinRoom = roomId => {
        roomManagementRef.child(roomId).update({
            status: roomStatuses.occupied
        });
    };

    const renderSelectionScreen = () => {
        const buttonsContent = Object.keys(roomsInfo)
            .filter(key => roomsInfo[key].code)
            .reduce((output, key) => {
                const roomObj = roomsInfo[key];
                const disabledVal = roomObj.status === roomStatuses.occupied ? ' disabled' : '';
                let buttonText = roomObj.name;
                if (roomObj.status === roomStatuses.occupied) {
                    buttonText += ' (Occupied)';
                } else if (roomObj.status === roomStatuses.awaitingPlayers) {
                    // buttonText += ' (Waiting for more players, come on in!)';
                }
                return `
                    ${output}
                    <button class="${joinWaitingRoomTriggerClass}" ${disabledVal} ${roomIdAttr}="${key}">${buttonText}</button>
                `;
            }, '');
        replaceContent(el, `
            <div class="pwa-pregame">
                <h1>Select a Room:</h1>
                ${buttonsContent}
            </div>
        `);
    };

    const renderCodeEnterScreen = roomId => {
        replaceContent(el, `
            <div class="pwa-pregame pwa-pregame--enter-code">
                <h1>Enter the code you see on the screen</h1>
                <form class="${codeEnterFormClass}" ${roomIdAttr}="${roomId}">
                    <input type="tel" autofocus>
                    <button type="submit">Submit</button>
                    <button class="${codeEnterFormCancelTriggerClass}" type="button">Cancel</button>
                </form>
            </div>
        `);
        el.querySelector('.pwa-pregame--enter-code input').focus();
        currentRoom = 'enteringCode';
    };

    const renderWaitingScreen = roomId => {
        replaceContent(el, `
            <div class="pwa-pregame">
                <h1>Waiting for others</h1>
                <button class="${startTriggerClass}" ${roomIdAttr}="${roomId}">Everyone's here, let's go!</button>
            </div>
        `);
    };

    const renderRoomScreen = roomId => {
        const room = roomsInstances[roomId];
        if (room) {
            room.start();
        }
    };

    return {
        init
    };

};

export default roomManagement;