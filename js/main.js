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

const generateCommentId = createRandomIdFromRangeGenerator(MIN_COMMENT_ID, MAX_COMMENT_ID);
const generatePostId = createRandomIdFromRangeGenerator(MIN_POST_ID, MAX_POST_ID);

const createComment = (id = generateCommentId()) => ({
  id, //createRandomIdFromRangeGenerator(MIN_COMMENT_ID, MAX_COMMENT_ID),
  avatar: `img/avatar-${createRandomIdFromRangeGenerator(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES)
});

const createPost = (id = generatePostId()) => ({
  id, //createRandomIdFromRangeGenerator(MIN_POST_ID, MAX_POST_ID),
  url: `photos/${getRandomInteger(MIN_POST_ID, MAX_POST_ID)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(20, 67)}, createComment)
});

const createSeveralPosts = (count) => Array.from({length: count}, createPost);

createSeveralPosts(25);
