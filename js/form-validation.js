import { isEscapeKey } from './utils.js';

const REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const DESCRIPTION_MAX_LENGTH = 140;
const HASTAG_ERROR = 'Некорректно введены хештеги';
const DESCRIPTION_ERROR = `Описание не больше ${DESCRIPTION_MAX_LENGTH} символов`;

const form = document.querySelector('#upload-select-image');

const pristine = new Pristine(form, {}, false);

const uploadButton = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const uploadOverlayCloseButton = uploadOverlay.querySelector('#upload-cancel');
const uploadOverlayHashtags = uploadOverlay.querySelector('.text__hashtags');
const uploadOverlayImageDescription = uploadOverlay.querySelector('.text__description');
const uploadOverlaySubmit = uploadOverlay.querySelector('#upload-submit');

const onUploadOverlayOpen = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  uploadOverlayCloseButton.addEventListener('click', onUploadOverlayClose);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onUploadOverlayClose() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadOverlayCloseButton.removeEventListener('click', onUploadOverlayClose);
  document.removeEventListener('keydown', onDocumentKeydown);

  uploadButton.value = '';
  uploadOverlayHashtags.value = '';
  uploadOverlayImageDescription.value = '';
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt.key) && uploadOverlayHashtags === document.activeElement && uploadOverlayImageDescription === document.activeElement) {
    evt.preventDefault();
    onUploadOverlayClose();
  }
}


export const hasDuplicates = (array) => {
  const set = Array.from(new Set(array));

  if (set.length === array.length) {
    return false;
  }

  return true;
};

const validateHashtags = (hashtagsList) => {
  let hashtags = hashtagsList.trim();

  if (hashtags.length) {
    hashtags = hashtagsList.trim().split(' ').map((s) => s.toLowerCase());
  }


  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  for (const hashtag of hashtags) {
    if (!REGEXP.test(hashtag)) {
      return false;
    }
  }

  if (hasDuplicates(hashtags)) {
    return false;
  }

  return true;
};

const validateDescription = (value) => value.length <= DESCRIPTION_MAX_LENGTH;

pristine.addValidator(uploadOverlayHashtags, validateHashtags, HASTAG_ERROR);
pristine.addValidator(uploadOverlayImageDescription, validateDescription, DESCRIPTION_ERROR);

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }
  onUploadOverlayClose();
};

uploadButton.addEventListener('change', onUploadOverlayOpen);

uploadOverlaySubmit.addEventListener('click', onUploadFormSubmit);
