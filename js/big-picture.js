import { isEscapeKey } from './utils.js';

const COMMENT_WIDTH = 35;
const COMMENT_HEIGHT = 35;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImg = bigPictureElement.querySelector('img');
const bigPictureLikes = bigPictureElement.querySelector('.likes-count');
const bigPictureCurrentCommentsCount = bigPictureElement.querySelector('.loaded-comments-count');
const bigPictureCommentsCount = bigPictureElement.querySelector('.comments-count');
const bigPictureCommentsList = bigPictureElement.querySelector('.social__comments');
const bigPictureCommentsLoadButton = bigPictureElement.querySelector('.comments-loader');
const bigPictureDescription = bigPictureElement.querySelector('.social__caption');
const bigPictureCloseButton = bigPictureElement.querySelector('.big-picture__cancel');

const onBigPictureClose = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCloseButton.removeEventListener('click', onBigPictureClose);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    onBigPictureClose();
  }
}

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = comment.avatar;
  avatarElement.alt = comment.avatar;
  avatarElement.width = COMMENT_WIDTH;
  avatarElement.height = COMMENT_HEIGHT;

  const messageElement = document.createElement('p');
  messageElement.classList.add('social__text');
  messageElement.textContent = comment.message;

  commentElement.appendChild(avatarElement);
  commentElement.appendChild(messageElement);

  return commentElement;
};

const createCommentsFragment = (comments) => {
  const COMMENTS_COUNT = 5;
  let currentCommentsCount = 0;

  return () => {
    const fragment = document.createDocumentFragment();

    for (let i = currentCommentsCount; i < COMMENTS_COUNT + currentCommentsCount; i++) {
      if (comments[i]) {
        fragment.appendChild(createCommentElement(comments[i]));
      } else {
        currentCommentsCount -= (COMMENTS_COUNT - i);
        break;
      }
    }
    currentCommentsCount += COMMENTS_COUNT;

    bigPictureCommentsList.appendChild(fragment);

    bigPictureCurrentCommentsCount.textContent = currentCommentsCount;
  };
};

const fillBigPictureElement = (post) => {
  bigPictureImg.src = post.url;
  bigPictureLikes.textContent = post.likes;
  bigPictureCommentsCount.textContent = post.comments.length;
  bigPictureCommentsList.innerHTML = '';
  bigPictureDescription.textContent = post.description;

  const appendComments = createCommentsFragment(post.comments);
  appendComments();

  bigPictureCommentsLoadButton.addEventListener('click', appendComments);

  bigPictureCloseButton.addEventListener('click', onBigPictureClose);
  document.addEventListener('keydown', onDocumentKeydown);
};

export const showBigPicture = (post) => {
  fillBigPictureElement(post);
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};


