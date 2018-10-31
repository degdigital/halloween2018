function render(containerEl) {
    const html = `
        <div class="meter-wrap fade-in fade-in--medium">
            <meter id="meter" name="meter" min="0" max="9" low="3" high="6" optimum="0" value="0"></meter>
        </div>`;

    containerEl.insertAdjacentHTML('beforeend', html);
    return containerEl.querySelector('#meter');
}

function setValue(value, meterEl) {
    meterEl.value = value;
}

function meter(containerEl) {
    const meterEl = render(containerEl);

    return {
        setValue: value => setValue(value, meterEl)
    }
}

export default meter;