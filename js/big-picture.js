import { isEscapeKey } from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImg = bigPictureElement.querySelector('img');
const bigPictureLikes = bigPictureElement.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureElement.querySelector('.comments-count');
const bigPictureCommentsList = bigPictureElement.querySelector('.social__comments');
const bigPictureDescription = bigPictureElement.querySelector('.social__caption');
const bigPictureCloseButton = bigPictureElement.querySelector('.big-picture__cancel');

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = comment.avatar;
  avatarElement.alt = comment.avatar;
  avatarElement.width = 35;
  avatarElement.height = 35;

  const messageElement = document.createElement('p');
  messageElement.classList.add('social__text');
  messageElement.textContent = comment.message;

  commentElement.appendChild(avatarElement);
  commentElement.appendChild(messageElement);

  return commentElement;
};

const createCommentsFragment = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });

  return fragment;
};

const fillBigPictureElement = (post) => {
  bigPictureImg.src = post.url;
  bigPictureLikes.textContent = post.likes;
  bigPictureCommentsCount.textContent = post.comments.length;
  /*Необходимо зачищать контейнер с комментариями,
   так как они накапливаются бесконечно при открытии
   разных фото*/
  bigPictureCommentsList.innerHTML = '';
  bigPictureCommentsList.appendChild(createCommentsFragment(post.comments));
  bigPictureDescription.textContent = post.description;

  bigPictureCloseButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onDocumentKeydown);
};

export const showBigPicture = (post) => {
  fillBigPictureElement(post);
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');
};


