const countdownTimer = (displayEl, length = 30, expireCallback = null) => {

    const timer = timeLength => {
        if (timeLength <= 0) {
            if (expireCallback) {
                expireCallback();
            }
            return;
        }
        if (displayEl) {
            displayEl.innerHTML = timeLength;
        }
        return setTimeout(() => {timer(--timeLength)}, 1000);
    };

    return timer(length);
    
};
    
export {
    countdownTimer
};