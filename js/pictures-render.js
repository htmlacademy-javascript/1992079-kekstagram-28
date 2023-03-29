import {posts} from './post-data.js';

const renderIntoElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

posts.forEach((prop) => {
  const element = pictureTemplate.cloneNode(true);

  element.querySelector('img').src = prop.url;
  element.querySelector('.picture__likes').textContent = prop.likes;
  element.querySelector('.picture__comments').textContent = prop.comments.length;

  fragment.appendChild(element);
});

renderIntoElement.appendChild(fragment);
