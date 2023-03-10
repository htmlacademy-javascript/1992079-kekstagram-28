import {createPost} from './data.js';

const POSTS_TO_CREATE = 25;

const createSeveralPosts = (count) => Array.from({length: count}, (_, i) => createPost(i));

createSeveralPosts(POSTS_TO_CREATE);
