import { isEscapeKey, hasDuplicates } from './utils.js';

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
  if (isEscapeKey(evt.key)) {
    if(uploadOverlayHashtags === document.activeElement) {
      return;
    }

    if(uploadOverlayImageDescription === document.activeElement) {
      return;
    }

    evt.preventDefault();
    onUploadOverlayClose();
  }
}


const validateHashtags = (value) => {
  const hashtags = value.split(' ').map((s) => s.toLowerCase());
  const regexp = /^#[a-zа-яё0-9]{1,19}$/i;

  let result = true;

  if(hashtags[0] === '') {
    return true;
  }

  if(hashtags.length > 5) {
    return false;
  }

  hashtags.forEach((element) => {
    if (!regexp.test(element)) {
      result = false;
    }
  });

  if(hasDuplicates(hashtags)) {
    return false;
  }

  return result;
};

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(uploadOverlayHashtags, validateHashtags, 'Некорректно введены хештеги');
pristine.addValidator(uploadOverlayImageDescription, validateDescription, 'Описание не больше 140 символов');

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  if(!pristine.validate()) {
    return;
  }

  onUploadOverlayClose();
};

uploadButton.addEventListener('change', onUploadOverlayOpen);

uploadOverlaySubmit.addEventListener('click', onUploadFormSubmit);
