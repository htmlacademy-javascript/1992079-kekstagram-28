export const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

export const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export const isEscapeKey = (key) => key === 'Escape';

export const hasDuplicates = (array) => {
  const valuesSoFar = [];
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (value in valuesSoFar) {
      return true;
    }
    valuesSoFar.push(value);
  }
  return false;
};
