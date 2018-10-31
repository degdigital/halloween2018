const roomManagement = ({timer, roomId, onIdle, onAwaitingPlayers, onOccupied}) => {

    const roomManagementRef = firebase.app().database().ref(`roomManagement/${roomId}`);
    const timerAmount = timer || 10000000;
    let timerInst;
    let generatedCode;

    const init = () => {
        bindEvents();
    };

    const bindEvents = () => {
        roomManagementRef.child('status').on('value', snapshot => onStatusChange(snapshot.val()));
    };

    const onStatusChange = async status => {
        if (status === 'idle') {
            handleIdleStatus();
        }
        if (status === 'awaitingPlayers') {
            handleAwaitingStatus();
        }
        if (status === 'occupied') {
            const userInfo = await getUserInfo();
            startTimer();
            onOccupied(userInfo);
        }
    };

    const handleIdleStatus = async () => {
        generatedCode = await generateCode();
        onIdle(generatedCode);
    };

    const handleAwaitingStatus = async () => {
        if (!generatedCode) {
            generatedCode = await generateCode();
        }
        onAwaitingPlayers(generatedCode);
    };

    const endSession = () => {
        resetTimer();
        roomManagementRef.update({
            status: 'idle',
            users: null
        }).then(handleIdleStatus);
    };
    
    const generateCode = () => {
        const randomCode = Math.floor(1000 + Math.random() * 9000);
        return roomManagementRef.update({
            code: randomCode
        }).then(() => randomCode);
    };
    
    const getUserInfo = () => {
        return roomManagementRef.child('users').once('value').then(snapshot => snapshot.val());
    };

    const startTimer = () => {
        timerInst = setTimeout(endSession, timerAmount);
    };

    const resetTimer = () => {
        clearTimeout(timerInst);
        startTimer();
    };

    init();

    return {
        endSession,
        resetTimer
    };

};

export default roomManagement;