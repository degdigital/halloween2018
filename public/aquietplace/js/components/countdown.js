function render(containerEl) {
    const html = `
        <div class="countdown fade-in fade-in--medium" id="countdown"></div>`;

    containerEl.insertAdjacentHTML('beforeend', html);
    return containerEl.querySelector('#countdown');
}

function start(countdownEl, startValue) {
    let secondsLeft = startValue/1000;
    update(countdownEl, secondsLeft);

    const intervalId = setInterval(() => {
        secondsLeft--;
        if(secondsLeft === 0) {
            clearInterval(intervalId);    
        } 
        update(countdownEl, secondsLeft);
    }, 1000);

    return intervalId;
}

function stop(intervalId) {
    clearInterval(intervalId);    
}

function update(countdownEl, value) {
    countdownEl.textContent = value;
}

function countdown(containerEl) {
    let intervalId;
    const countdownEl = render(containerEl);

    return {
        start: startValue => {
            intervalId = start(countdownEl, startValue)
        },
        stop: () => stop(intervalId)
    }
}

export default countdown;