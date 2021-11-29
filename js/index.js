const aboutOrderBtn = document.querySelector('.about__order-btn');
const pageOverlayModal = document.querySelector('.page__overlay_modal');
const modalClose = document.querySelector('.modal__close');

const handlerModal = (selectorBtn, selectorModal, selectorActiveBtn, closeTrigger, speedKey = 5) => {

    let opacity = 0;

    const speed = {
        slow: 15,
        medium: 7,
        fast: 1
    };

    selectorBtn.addEventListener('click', () => {
        selectorModal.style.opacity = opacity;
        selectorModal.classList.add(selectorActiveBtn);
        const timer = setInterval(() => {
            opacity += 0.02;
            selectorModal.style.opacity = opacity;
            if (opacity >= 1) clearInterval(timer);
        }, speed[speedKey]);
    });

    closeTrigger.addEventListener('click', () => {
        const timer = setInterval(() => {
            opacity -= 0.02;
            selectorModal.style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(timer);
                selectorModal.classList.remove(selectorActiveBtn);
            };
        }, speed[speedKey]);
    });
};

handlerModal(aboutOrderBtn, pageOverlayModal, 'page__overlay_modal_open', modalClose);