
import {getRandomArrayElement, getRandomInteger} from './utils.js';

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

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_COMMENTS = 20;
const MAX_COMMENTS = 67;

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES)
});

export const createPost = (id) => ({
  id,
  url: `photos/${id + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, (v,i) => createComment(i))
});

const POSTS_TO_CREATE = 25;

const createSeveralPosts = (count) => Array.from({length: count}, (_, i) => createPost(i));

export const posts = createSeveralPosts(POSTS_TO_CREATE);

