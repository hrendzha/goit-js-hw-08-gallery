const galleryItems = [
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
];

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImgRef = lightboxRef.querySelector('.lightbox__image');

galleryRef.insertAdjacentHTML('beforeend', createGalleryItemsMarkup(galleryItems));

galleryRef.addEventListener('click', onFullImageOpenClick);
lightboxRef.addEventListener('click', onFullImageCloseClick);
galleryRef.addEventListener('focusin', onGalleryLinkFocusWithTab);

function createGalleryItemsMarkup(galleryItems) {
    return galleryItems
        .map(
            ({ preview, original, description }) =>
                `   <li class="gallery__item">
                <a
                    class="gallery__link"
                    href="${original}"
                >
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
                </li>`,
        )
        .join('');
}

function onFullImageOpenClick(event) {
    event.preventDefault();

    const { target, currentTarget } = event;

    if (target.nodeName !== 'IMG') return;

    currentTarget.removeEventListener('keydown', onFullImageOpenWithEnter);
    window.addEventListener('keydown', onEscKeyPress);

    switchesGalleryWithArrows();

    const originalImgUrl = target.dataset.source;
    const imgDesc = target.alt;

    toggleClassOnLightbox();
    replaceAttributeValueOnLightbox(originalImgUrl, imgDesc);
}

function switchesGalleryWithArrows() {
    window.addEventListener('keydown', onLeftArrowPress);
    window.addEventListener('keydown', onRightArrowPress);
}

function onLeftArrowPress({ code }) {
    const previousImgRef = galleryRef
        .querySelector(`[data-source="${lightboxImgRef.src}"]`)
        .closest('.gallery__item')
        .previousElementSibling?.querySelector('.gallery__image');

    if (code === 'ArrowLeft' && previousImgRef) {
        replaceAttributeValueOnLightbox(previousImgRef.dataset.source, previousImgRef.alt);
    }
}

function onRightArrowPress({ code }) {
    const nextImgRef = galleryRef
        .querySelector(`[data-source="${lightboxImgRef.src}"]`)
        .closest('.gallery__item')
        .nextElementSibling?.querySelector('.gallery__image');

    if (code === 'ArrowRight' && nextImgRef) {
        replaceAttributeValueOnLightbox(nextImgRef.dataset.source, nextImgRef.alt);
    }
}

function toggleClassOnLightbox() {
    lightboxRef.classList.toggle('is-open');
}

function onFullImageCloseClick({ target }) {
    const lightboxBtnCloseRef = document.querySelector('[data-action="close-lightbox"]');
    const lightboxOverlayRef = document.querySelector('.lightbox__overlay');

    if (target === lightboxBtnCloseRef || target === lightboxOverlayRef) {
        toggleClassOnLightbox();
        setTimeout(clearAttributeValueUrl, 250);

        removeEventListenerOnEscKeyPress();
        removeEventListenersOnArrowsPress();
    }
}

function replaceAttributeValueOnLightbox(imgUrl, imgDesc) {
    lightboxImgRef.src = imgUrl;
    lightboxImgRef.alt = imgDesc;
}

function clearAttributeValueUrl() {
    lightboxImgRef.src = '';
}

function onEscKeyPress({ code }) {
    if (code === 'Escape') {
        toggleClassOnLightbox();
        setTimeout(clearAttributeValueUrl, 250);

        removeEventListenerOnEscKeyPress();
        removeEventListenersOnArrowsPress();
    }
}

function onGalleryLinkFocusWithTab({ currentTarget }) {
    currentTarget.addEventListener('keydown', onFullImageOpenWithEnter);
}

function onFullImageOpenWithEnter({ code, currentTarget, target }) {
    if (code === 'Tab') {
        currentTarget.removeEventListener('keydown', onFullImageOpenWithEnter);
    }

    window.addEventListener('keydown', onEscKeyPress);

    const originalImgUrl = target.firstElementChild.dataset.source;
    const imgDesc = target.firstElementChild.alt;

    if (code === 'Enter') {
        toggleClassOnLightbox();
        replaceAttributeValueOnLightbox(originalImgUrl, imgDesc);
    }
}

function removeEventListenerOnEscKeyPress() {
    window.removeEventListener('keydown', onEscKeyPress);
}

function removeEventListenersOnArrowsPress() {
    window.removeEventListener('keydown', onRightArrowPress);
    window.removeEventListener('keydown', onLeftArrowPress);
}
