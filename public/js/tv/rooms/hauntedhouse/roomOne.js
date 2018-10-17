import {replaceContent} from '../../../utils/domUtils.js';

const roomOne = (el, settings = {}) => {

    const roomDataRef = firebase.app().database().ref(`roomData/hauntedHouse/roomOne`);
    let users;
    let usersCount = 0;

    const init = () => {
        roomDataRef.on('value', snapshot => {
            const val = snapshot.val();
            if (val) {
                const count = Object.keys(snapshot.val()).length;
                renderCount(count);
            }
        });
    };

    const renderCount = (count = 0) => {
        if (count !== usersCount) {
            replaceContent(el, `
                <div>Press and hold!<br>
                Count: ${!count || count === 0 ? 0 : count}</div>
            `);
        } else {
            replaceContent(el, `
                <div>You did it!</div>
            `);
        }
    };

    const render = userInfo => {
        users = userInfo;
        usersCount = Object.keys(users).length;
        renderCount();
    };

    init();

    return {
        render
    };
    
};

export default roomOne;