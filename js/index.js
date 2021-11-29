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

        selectorBtn.addEventListener('click', () => {
            selectorModal.style.opacity = opacity;
            selectorModal.classList.add(selectorActiveBtn);
            const anim = () => {
                opacity += speed[speedKey];
                selectorModal.style.opacity = opacity;
                if (opacity < 1) requestAnimationFrame(anim);
            };
            requestAnimationFrame(anim);
        });

        closeTrigger.addEventListener('click', () => {
            const anim = () => {
                opacity -= speed[speedKey];
                selectorModal.style.opacity = opacity;
                if (opacity > 0) {
                    requestAnimationFrame(anim);
                } else {
                    selectorModal.classList.remove(selectorActiveBtn);
                };
            };
            requestAnimationFrame(anim);
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