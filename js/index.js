const disabledScroll = () => {
    const widthScroll = window.innerWidth - document.body.offsetWidth;

    document.querySelector('.page__header').style.left = `calc(50% - ${720 + widthScroll/2}px)`;

    document.body.scrollPosition = window.scrollY;

    document.documentElement.style.cssText = `
        position: relative;
        height: 100vh;
    `;

    document.body.style.cssText = `
        overflow: hidden;
        position: fixed;
        top: -${document.body.scrollPosition}px;
        left: 0;
        height: 100vh;
        width: 100vw;
        padding-right: ${widthScroll}px;
    `;
};

const enabledScroll = () => {
    document.documentElement.style.cssText = '';
    document.body.style.cssText = 'position: relative';
    document.querySelector('.page__header').style.left = `calc(50% - 720px)`;
    window.scroll({top: document.body.scrollPosition});
};

{ // модальное окно
    const aboutOrderBtn = document.querySelector('.about__order-btn');
    const pageOverlayModal = document.querySelector('.page__overlay_modal');
    const modalClose = document.querySelector('.modal__close');

    const handlerModal = (selectorBtn, selectorModal, selectorActiveBtn, closeTrigger, speedKey = 'medium') => {

        let opacity = 0;

        const speed = {
            slow: 0.02,
            medium: 0.05,
            fast: 0.1,
        };

        const openModal = () => {
            disabledScroll();

            selectorModal.style.opacity = opacity;
            selectorModal.classList.add(selectorActiveBtn);
            const anim = () => {
                opacity += speed[speedKey];
                selectorModal.style.opacity = opacity;
                if (opacity < 1) requestAnimationFrame(anim);
            };
            requestAnimationFrame(anim);
        };

        const closeModal = () => {
            const anim = () => {
                opacity -= speed[speedKey];
                selectorModal.style.opacity = opacity;
                if (opacity > 0) {
                    requestAnimationFrame(anim);
                } else {
                    selectorModal.classList.remove(selectorActiveBtn);
                    opacity = 0;
                    selectorModal.style.opacity = 0;
                    enabledScroll();
                };
            };
            requestAnimationFrame(anim);
        };

        selectorBtn.addEventListener('click', openModal);

        closeTrigger.addEventListener('click', closeModal);

        selectorModal.addEventListener('click', (event) => {
            if (event.target === selectorModal) {
                closeModal();
            };
        });
    };

    handlerModal(aboutOrderBtn, pageOverlayModal, 'page__overlay_modal_open', modalClose);
}

{ // бургер меню
    const selectorContacts = document.querySelector('.header__contacts');
    const contactsMenuBtn = document.querySelector('.header__contacts-menu');

    const handlerBurger = (selectorContacts, contactsMenuBtn, classContactsOpen) => {
        contactsMenuBtn.addEventListener('click', () => {
            if (selectorContacts.classList.contains(classContactsOpen)) {
                selectorContacts.style.height = '';
                selectorContacts.classList.remove(classContactsOpen);
            } else {
                selectorContacts.style.height = selectorContacts.scrollHeight + 'px';
                selectorContacts.classList.add(classContactsOpen);
            };
        });
    };

    handlerBurger(selectorContacts, contactsMenuBtn, 'header__contacts_open');
}

{ // галерея

    const portfolioList = document.querySelector('.portfolio__list');
    const pageOverlay = document.createElement('div');
    pageOverlay.classList.add('page__overlay');

    portfolioList.addEventListener('click', (event) => {
        const card = event.target.closest('.card');

        if (card) {
            document.body.append(pageOverlay);

            disabledScroll();

            const title = card.querySelector('.card__client');

            const picture = document.createElement('picture');
            picture.style.cssText = `
                position: absolute;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                width: 90%;
                max-width: 1440px;
            `;

            picture.innerHTML = `
                <source srcset="${card.dataset.fullImage}.avif" type="image/avif">
                <source srcset="${card.dataset.fullImage}.webp" type="image/webp">
                <img src="${card.dataset.fullImage}.jpg" alt="${title.textContent}">
            `;

            pageOverlay.append(picture);
        };
    });

    pageOverlay.addEventListener('click', () => {
        pageOverlay.textContent = '';
        pageOverlay.remove();
        enabledScroll();
    });
}