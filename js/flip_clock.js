(function () {
    const hms = {
        hr: init(`hr`),
        min: init(`min`),
        sec: init(`sec`),
    };

    function init(type) {
        let el = [{}];
        el.target = document.querySelector(`.clock_${type}`);
        el.card = el.target.querySelector(`.card`);
        el.cardFaceA = el.card.querySelector(`.card_face_front`);
        el.cardFaceB = el.card.querySelector(`.card_face_back`);
        return el;
    }

    (function runClock() {
        const time = new Date();
        const now = {
            hr: time.getHours(),
            min: time.getMinutes(),
            sec: time.getSeconds(),
        };
        for (const key in hms) {
            const el = hms[key];
            let num = 60;
            let curr = now[key];
            let next = (curr + 1) % num;
            if (key == 'hr') {
                if (curr >= 12){
                    document.querySelector(`.tc_card`).style.transform = `rotateX(-180deg)`;
                    document.querySelector(`.tc_card`).style.backfaceVisibility = `hidden`;
                }
                num = 12;
                curr = curr % num ? curr % num : 12;
                next = (curr + 1) % num ? (curr + 1) % num : 12;
            }
            if (typeof el.cardFaceA.textContent == "string") {
                el.cardFaceB.textContent = curr;
            }
            if (el.cardFaceA.textContent != curr) {
                el.card.addEventListener('transitionend', function () {
                    el.cardFaceA.textContent = curr;
                    const cardClone = el.card.cloneNode(true);
                    cardClone.classList.remove(`flipped`);
                    el.target.replaceChild(cardClone, el.card);
                    el.card = cardClone;
                    el.cardFaceA = el.card.querySelector(`.card_face_front`);
                    el.cardFaceB = el.card.querySelector(`.card_face_back`);
                    el.cardFaceB.textContent = next;
                }, { once: true });
                el.card.classList.add(`flipped`);
            }
        }
        setTimeout(runClock, 1000);
    })();
})();