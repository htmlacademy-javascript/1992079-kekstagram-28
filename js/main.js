const COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Стив', 'Глеб', 'Моника', 'Ирина', 'Белла', 'Эдвард', 'Джейкоб', 'Элис', 'Евлампия', 'Агафоник'];

const DESCRIPTIONS = ['Привет, мир! Этот день не был бы таким прекрасным, если бы вы не увидели меня!',
  'Вы конечно не в церкви, но Икона перед вами',
  'Счастливого мужчину выдает животик, который он отрастил на вкусной домашней еде.',
  'Я не злой, просто ты не нравишься мне!',
  'С некоторыми людьми даже молчать интересно.'];

const MIN_POST_ID = 1;
const MAX_POST_ID = 25;
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 100;
const MIN_COMMENTS_COUNT = 20;
const MAX_COMMENTS_COUNT = 67;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => ({
  id: createRandomIdFromRangeGenerator(MIN_COMMENT_ID, MAX_COMMENT_ID),
  avatar: `img/avatar-${createRandomIdFromRangeGenerator(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES)
});

const createPost = () => ({
  id: createRandomIdFromRangeGenerator(MIN_POST_ID, MAX_POST_ID),
  url: `photos/${getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: Array.from({length: getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT)}, createComment())
});

const kekstagramPost = createPost();
