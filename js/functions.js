const checkStringLength = (str, strLength) => str.length <= strLength;

const isPalindrome = (str) => {
  const strTrimed = str.replaceAll(' ', '');
  const strToCheck = str.split('').reverse().join('');

  return strTrimed === strToCheck;
};

const getNumbersFromString = (str) => {
  const checkingString = typeof str === 'number' ? String(str) : str;

  let number = '';

  for (const ch of checkingString) {
    if (Number.isInteger(parseInt(ch, 10))) {
      number += ch;
    }
  }

  return parseInt(number, 10);
};

const addSymbols = (str, strLength, addingStr) => {
  let resultStr = str;

  while (resultStr.length < strLength) {
    resultStr = addingStr.slice(0, strLength - resultStr.length) + resultStr;
  }

  return resultStr;
};


checkStringLength('blablabla', 8);
isPalindrome('blaa lb');
getNumbersFromString('ababab 2041');
addSymbols('q', 4, 'we');
