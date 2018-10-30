import {replaceContent} from '../utils/domUtils.js';
import roomManagement from './components/roomManagement.js';

const el = document.getElementById('app');
const roomManagementInst = roomManagement(el);
const lsKey = 'degHalloween';
const formClass = 'registration-form';

const init = () => {
    const userInfo = getUserInfo();
    if (userInfo) {
        roomManagementInst.init(userInfo);
    } else {
        saveUserInfo(userInfo => roomManagementInst.init(userInfo));
    }
};

const getUserInfo = () => {
    const userInfo = localStorage.getItem(lsKey);
    const userFields = ['key'];
    if (!userInfo) {
        return null;
    } else {
        const parsedUserInfo = JSON.parse(userInfo);
        if (!Object.keys(parsedUserInfo).every(key => userFields.includes(key))) {
            return null;
        }
        return parsedUserInfo;
    }
};

const saveUserInfo = (callback) => {
    const vals = {
        key: firebase.app().database().ref().push().getKey()
    };
    localStorage.setItem(lsKey, JSON.stringify(vals));
    callback(vals);
};

init();