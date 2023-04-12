import { isEscapeKey, showAlert } from './utils.js';
import { sendData } from './api.js';

const REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const DESCRIPTION_MAX_LENGTH = 140;
const HASTAG_ERROR = 'Некорректно введены хештеги';
const DESCRIPTION_ERROR = `Описание не больше ${DESCRIPTION_MAX_LENGTH} символов`;

//Получение формы как элемента
const form = document.querySelector('#upload-select-image');

const pristine = new Pristine(form, {}, false);

//Получение элементов формы
const uploadButton = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const uploadOverlayCloseButton = uploadOverlay.querySelector('#upload-cancel');
const uploadOverlayHashtags = uploadOverlay.querySelector('.text__hashtags');
const uploadOverlayImageDescription = uploadOverlay.querySelector('.text__description');
const uploadOverlaySubmit = uploadOverlay.querySelector('#upload-submit');

//Переменные для изменения масштаба изображения
const MAX_SCALE = 1;
const MIN_SCALE = 0.25;
const scaleStep = 0.25;

const scaleControlBiggerButton = form.querySelector('.scale__control--bigger');
const scaleControlSmallerButton = form.querySelector('.scale__control--smaller');
const scaleControlValue = form.querySelector('.scale__control--value');
const imagePreview = form.querySelector('.img-upload__preview');

let currentScale;

//переменные для фильтров
const sliderElement = form.querySelector('.effect-level__slider');
const sliderValueElement = form.querySelector('.effect-level__value');

sliderValueElement.value = 1;

const effectsListElement = form.querySelector('.effects__list');
const effects = {
  none: 'effects__preview--none',
  chrome: 'effects__preview--chrome',
  sepia: 'effects__preview--sepia',
  marvin: 'effects__preview--marvin',
  phobos: 'effects__preview--phobos',
  heat: 'effects__preview--heat'
};
let currentEffect = 'effects__preview--none';

//Функции для обработчиков
const onUploadOverlayOpen = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  uploadOverlayCloseButton.addEventListener('click', onUploadOverlayClose);
  document.addEventListener('keydown', onDocumentKeydown);

  currentScale = 1;
  renderImage();
};

function onUploadOverlayClose() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadOverlayCloseButton.removeEventListener('click', onUploadOverlayClose);
  document.removeEventListener('keydown', onDocumentKeydown);

  uploadButton.value = '';
  uploadOverlayHashtags.value = '';
  uploadOverlayImageDescription.value = '';
  Object.values(effects).forEach((effect) => {
    imagePreview.classList.remove(effect);
  });
  currentEffect = effects['none'];
  imagePreview.classList.add(currentEffect);

}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt.key)
  && !(uploadOverlayHashtags === document.activeElement)
  && !(uploadOverlayImageDescription === document.activeElement)) {
    evt.preventDefault();
    onUploadOverlayClose();
  }
}

//Валидация полей
export const isTagsUnique = (array) => {
  const set = new Set(array);

  return set.size === array.length;
};

const validateHashtags = (hashtagsList) => {
  const hashtagsString = hashtagsList.trim();

  if (!hashtagsString.length) {
    return true;
  }

  const hashtags = hashtagsString.split(' ').map((s) => s.toLowerCase());

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  for (const hashtag of hashtags) {
    if (!REGEXP.test(hashtag)) {
      return false;
    }
  }

  if (!isTagsUnique(hashtags)) {
    return false;
  }

  return true;
};

const validateDescription = (value) => value.length <= DESCRIPTION_MAX_LENGTH;

pristine.addValidator(uploadOverlayHashtags, validateHashtags, HASTAG_ERROR);
pristine.addValidator(uploadOverlayImageDescription, validateDescription, DESCRIPTION_ERROR);

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    sendData(new FormData(form))
      .then(onUploadOverlayClose)
      .catch((err) => {
        showAlert(err.message);
      });
  }

};

//Добавление обработчиков формы
uploadButton.addEventListener('change', onUploadOverlayOpen);
uploadOverlaySubmit.addEventListener('click', onUploadFormSubmit);


//Изменение масштаба изображения
function renderImage() {
  scaleControlValue.value = `${currentScale * 100}%`;
  imagePreview.style.transform = `scale(${currentScale})`;
}

scaleControlBiggerButton.addEventListener('click', () => {
  if (currentScale < MAX_SCALE) {
    currentScale += scaleStep;
    renderImage();
  }
});

scaleControlSmallerButton.addEventListener('click', () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= scaleStep;
    renderImage();
  }
});

//Фильтры

const onEffectClick = (evt) => {
  if (evt.target.nodeName === 'INPUT') {
    Object.values(effects).forEach((effect) => {
      imagePreview.classList.remove(effect);
    });
    currentEffect = effects[evt.target.value];
    imagePreview.classList.add(currentEffect);

    if (currentEffect === 'effects__preview--none') {
      sliderElement.noUiSlider.disable();
      imagePreview.style['filter'] = '';
    }
    if (currentEffect === 'effects__preview--chrome') {
      sliderElement.noUiSlider.enable();
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
        connect: 'lower',
      });
      imagePreview.style['filter'] = `grayscale(${sliderElement.noUiSlider.get(true)})`;
    }
    if (currentEffect === 'effects__preview--sepia') {
      sliderElement.noUiSlider.enable();
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
        connect: 'lower',
      });
      imagePreview.style['filter'] = `sepia(${sliderElement.noUiSlider.get(true)})`;
    }
    if (currentEffect === 'effects__preview--marvin') {
      sliderElement.noUiSlider.enable();
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
        connect: 'lower',
      });
      imagePreview.style['filter'] = `invert(${sliderElement.noUiSlider.get(true) * 100}%)`;
    }
    if (currentEffect === 'effects__preview--phobos') {
      sliderElement.noUiSlider.enable();
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
        connect: 'lower',
      });
      imagePreview.style['filter'] = `blur(${sliderElement.noUiSlider.get()}px)`;
    }
    if (currentEffect === 'effects__preview--heat') {
      sliderElement.noUiSlider.enable();
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
        connect: 'lower',
      });
      imagePreview.style['filter'] = `brightness(${sliderElement.noUiSlider.get()})`;
    }
  }
};

effectsListElement.addEventListener('click', onEffectClick);

//Изменение интенсивности фильтров слайдером


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  sliderValueElement.value = sliderElement.noUiSlider.get(true);

  if (currentEffect === 'effects__preview--chrome') {
    imagePreview.style['filter'] = `grayscale(${sliderElement.noUiSlider.get(true)})`;
  }
  if (currentEffect === 'effects__preview--sepia') {
    imagePreview.style['filter'] = `sepia(${sliderElement.noUiSlider.get(true)})`;
  }
  if (currentEffect === 'effects__preview--marvin') {
    imagePreview.style['filter'] = `invert(${sliderElement.noUiSlider.get(true)})`;
  }
  if (currentEffect === 'effects__preview--phobos') {
    imagePreview.style['filter'] = `blur(${sliderElement.noUiSlider.get(true)})`;
  }
  if (currentEffect === 'effects__preview--heat') {
    imagePreview.style['filter'] = `brightness(${sliderElement.noUiSlider.get(true)})`;
  }
  if (currentEffect === 'effects__preview--none') {
    imagePreview.style['filter'] = '';
  }
});
