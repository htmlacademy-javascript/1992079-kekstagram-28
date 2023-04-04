import {posts} from './post-data.js';
import {showBigPicture} from './big-picture.js';

const galleryElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPhoto = (prop) => {
  const element = pictureTemplate.cloneNode(true);

  element.querySelector('img').src = prop.url;
  element.querySelector('.picture__likes').textContent = prop.likes;
  element.querySelector('.picture__comments').textContent = prop.comments.length;
  element.id = prop.id - 1;

  return element;
};

const renderGallery = (props) => {
  const fragment = document.createDocumentFragment();

  props.forEach((prop) => {
    const element = createPhoto(prop);
    fragment.appendChild(element);
  });

  galleryElement.appendChild(fragment);

  galleryElement.addEventListener('click', (evt) => {
    showBigPicture(props[evt.target.closest('a').id]);
  });
};

renderGallery(posts);
