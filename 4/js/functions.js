function checkStringLength(str, strLength) {
  return str.length <= strLength;
}

function checkPalindrome(str) {
  let strToCheck = '';

  str = str.replaceAll(' ', '');

  for (let i = str.length - 1; i >= 0; i--) {
    strToCheck += str[i];
  }

  return str === strToCheck;
}

function getNumbersFromString(str) {
  str = String(str);

  let number = '';

  for (let i = 0; i < str.length; i++) {
    if (Number(str[i]) || str[i] === '0') {
      number += str[i];
    }
  }

  return Number(number);
}

function addSymbols(str, strLength, addingStr) {

  while (str.length < strLength) {
    str = addingStr.slice(0, strLength - str.length) + str;
  }

  return str;
}


checkStringLength('blablabla', 8);
checkPalindrome('blaa lb');
getNumbersFromString('ababab 2341');
addSymbols('q', 4, 'we');
