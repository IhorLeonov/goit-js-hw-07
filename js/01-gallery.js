'use stict';
// Создай галерею с возможностью клика по её элементам и просмотра полноразмерного изображения в модальном окне.

// ✅ 1.Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
// ✅ 2.Реализация делегирования на div.gallery и получение url большого изображения.
// ✅ 3.Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные(.min) файлы библиотеки.
// ✅ 4.Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
// ✅ 5.Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.
// ✅ 6.Добавь закрытие модального окна по нажатию клавиши Escape. Сделай так, чтобы прослушивание клавиатуры было только пока открыто модальное окно.

import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryBox = document.querySelector('.gallery');
const imagesMarkup = createGalleryMarkup(galleryItems);
galleryBox.insertAdjacentHTML('beforeend', imagesMarkup);
galleryBox.addEventListener('click', onImageClick);
let lightbox;

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`;
    })
    .join('');
}

function stopLoadingImg(e) {
  e.preventDefault();
}

function onEscapePress(e) {
  if (e.code === 'Escape') {
    console.log('close modal');
    this.close();
  }
}

function onImageClick(e) {
  stopLoadingImg(e);

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  lightbox = basicLightbox.create(`<img src="${e.target.dataset.source}">`, {
    onShow: lightbox => {
      console.log('add listener');
      document.addEventListener('keydown', onEscapePress.bind(lightbox), {
        once: true,
      });
    },
    onClose: () => {
      console.log('delete listener');
      document.removeEventListener('keydown', onEscapePress);
    },
  });

  lightbox.show();

  onEscapePress(e);
}
