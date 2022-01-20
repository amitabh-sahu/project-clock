(function runClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const drawSeconds = ((seconds / 60) * 360) + 90;
    const drawMinutes = ((((seconds / 60) + minutes) / 60) * 360) + 90;
    const drawHours = ((((((seconds / 60) + minutes) / 60) + hours) / 12) * 360) + 90;

    needle_sec = document.querySelector(`.needle_sec`);
    needle_min = document.querySelector(`.needle_min`);
    needle_hr = document.querySelector(`.needle_hr`);
    needle_sec.style.transform = `rotate(${drawSeconds}deg)`;
    needle_min.style.transform = `rotate(${drawMinutes}deg)`;
    needle_hr.style.transform = `rotate(${drawHours}deg)`;

    if (drawSeconds === 444 || drawSeconds === 90) {
        needle_sec.style.transition = `all 0s ease 0s`;
    }
    else {
        needle_sec.style.transition = `all 0.05s cubic-bezier(0, 0, 0.52, 2.51) 0s`;
    }
    setTimeout(runClock, 1000);
})();