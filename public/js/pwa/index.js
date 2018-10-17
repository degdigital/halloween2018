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
        renderRegistrationForm();
    }
};

const renderRegistrationForm = () => {
    replaceContent(el, `
        <form class="${formClass}">
            <div class="field">
                <label for="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" maxlength="255">
            </div>
            <button type="submit">Submit</button>
        </form>
    `);
    bindEvents();
}

const bindEvents = () => {
    el.addEventListener('submit', onRegistrationSubmit);
}

const onRegistrationSubmit = e => {
    const formEl = e.target;
    if (formEl.matches(`.${formClass}`)) {
        e.preventDefault();
        saveUserInfo(formEl, userInfo => roomManagementInst.init(userInfo));
    }
};

const getUserInfo = () => {
    const userInfo = localStorage.getItem(lsKey);
    const userFields = ['firstName', 'key'];
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

const saveUserInfo = (formEl, callback) => {
    const inputEls = [...formEl.elements].filter(element => element.tagName.toLowerCase() === 'input');
    const vals = {};
    inputEls.forEach(el => {
        vals[el.name] = el.value 
    });
    vals.key = firebase.app().database().ref().push().getKey();
    localStorage.setItem(lsKey, JSON.stringify(vals));
    callback(vals);
};

init();