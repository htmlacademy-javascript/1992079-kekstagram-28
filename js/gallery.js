import {posts} from './post-data.js';
import {showBigPicture} from './big-picture.js';

const galleryElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPhoto = (prop) => {
  const element = pictureTemplate.cloneNode(true);

  element.querySelector('img').src = prop.url;
  element.querySelector('.picture__likes').textContent = prop.likes;
  element.querySelector('.picture__comments').textContent = prop.comments.length;
  element.dataId = prop.id - 1;

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

galleryElement.addEventListener('click', (evt) => {
  if(posts[evt.target.closest('a').dataId]) {
    showBigPicture(posts[evt.target.closest('a').dataId]);
  }
});

renderGallery(posts);
