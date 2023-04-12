//import {posts} from './post-data.js';
import {showBigPicture} from './big-picture.js';
import { getData } from './api.js';
import { showAlert, getRandomArrayElement } from './utils.js';

const galleryElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filtersElement = document.querySelector('.img-filters');
const defaultFilter = filtersElement.querySelector('#filter-default');
const randomFilter = filtersElement.querySelector('#filter-random');
const discussedFilter = filtersElement.querySelector('#filter-discussed');

const createPhoto = (prop) => {
  const element = pictureTemplate.cloneNode(true);

  element.querySelector('img').src = prop.url;
  element.querySelector('.picture__likes').textContent = prop.likes;
  element.querySelector('.picture__comments').textContent = prop.comments.length;
  element.dataId = prop.id;

  return element;
};

const renderGallery = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const element = createPhoto(photo);
    fragment.appendChild(element);
  });

  galleryElement.appendChild(fragment);
};

const onGalleryClick = (evt, posts) => {
  const photoElement = evt.target.closest('a');

  if (!photoElement) {
    return;
  }

  const photo = posts.find((element) => element.id === photoElement.dataId);

  if (photo) {
    showBigPicture(photo);
  }
};

getData()
  .then((response) => {
    renderGallery(response);
    galleryElement.addEventListener('click', (evt) => onGalleryClick(evt, response));
    filtersElement.classList.remove('img-filters--inactive');

    defaultFilter.addEventListener('click', () => {
      randomFilter.classList.remove('img-filters__button--active');
      discussedFilter.classList.remove('img-filters__button--active');
      defaultFilter.classList.add('img-filters__button--active');

      const elementsOnPage = galleryElement.querySelectorAll('a');
      elementsOnPage.forEach((element) => galleryElement.removeChild(element));

      renderGallery(response);
    });
    randomFilter.addEventListener('click', () => {
      defaultFilter.classList.remove('img-filters__button--active');
      discussedFilter.classList.remove('img-filters__button--active');
      randomFilter.classList.add('img-filters__button--active');

      const elementsOnPage = galleryElement.querySelectorAll('a');
      elementsOnPage.forEach((element) => galleryElement.removeChild(element));

      const newElements = Array.from({length: 10}, () => getRandomArrayElement(response));
      renderGallery(newElements);
    });
    discussedFilter.addEventListener('click', () => {
      defaultFilter.classList.remove('img-filters__button--active');
      randomFilter.classList.remove('img-filters__button--active');
      discussedFilter.classList.add('img-filters__button--active');

      const elementsOnPage = galleryElement.querySelectorAll('a');
      elementsOnPage.forEach((element) => galleryElement.removeChild(element));

      const newElements = response.slice();
      newElements.sort((a, b) => b.comments.length - a.comments.length);
      renderGallery(newElements);
    });
  })
  .catch((err) => showAlert(err.message));


