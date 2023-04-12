//import {posts} from './post-data.js';
import {showBigPicture} from './big-picture.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';

const galleryElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

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
  })
  .catch((err) => showAlert(err.message));
