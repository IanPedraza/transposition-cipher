const _code = function (plain_text, key) {
  var key_length = key.length;

  while (plain_text.length % key_length != 0) {
    plain_text += HOLDER;
  }

  var col_length = plain_text.length / key_length;
  var result = "";

  k = 0;

  for (i = 0; i < key_length; i++) {
    while (k < ALPH_SIZE) {
      pos = key.indexOf(String.fromCharCode(k));
      matrix = key.split("");
      matrix[pos] = "_";
      key = matrix.join("");
      if (pos >= 0) break;
      else k++;
    }

    for (j = 0; j < col_length; j++) {
      result += plain_text.charAt(j * key_length + pos);
    }
  }

  return result;
};

const _decode = function (cipher_text, keyword) {
  var key_length = keyword.length;

  var cols = new Array(key_length);
  var col_length = cipher_text.length / key_length;

  for (i = 0; i < key_length; i++)
    cols[i] = cipher_text.substr(i * col_length, col_length);

  var newcols = new Array(key_length);

  j = 0;
  i = 0;

  while (j < key_length) {
    pos = keyword.indexOf(String.fromCharCode(i));

    if (pos >= 0) {
      newcols[pos] = cols[j++];
      matrix = keyword.split("");
      matrix[pos] = "_";
      keyword = matrix.join("");
    } else {
      i++;
    }
  }

  var plain_text = "";

  for (i = 0; i < col_length; i++) {
    for (j = 0; j < key_length; j++) {
      plain_text += newcols[j].charAt(i);
    }
  }

  return plain_text;
};

const _hasDuplicates = function (key) {
  for (let char of key) {
    if (key.indexOf(char) != key.lastIndexOf(char)) {
      return true;
    }
  }

  return false;
};

const code = function () {
  errorInputText.innerText = null;
  errorInputKey.innerText = null;

  let input = inputText.value;

  if (!input) {
    errorInputText.innerText = "El mensaje no puede quedar vacío.";
    return;
  }

  let key = inputKey.value;

  if (!key) {
    errorInputKey.innerText = "La clave no puede quedar vacía.";
    return;
  }

  if (_hasDuplicates(key)) {
    errorInputKey.innerText = "La clave no puede tener caracteres repetidos.";
    return;
  }

  let coded = _code(input, key);
  let decoded = _decode(coded, key);

  inputCipher.innerText = coded;
  inputUncipher.innerText = decoded;
};

const decode = function () {
  errorInputText.innerText = null;
  errorInputKey.innerText = null;

  let input = inputText.value;

  if (!input) {
    errorInputText.innerText = "El mensaje no puede quedar vacío.";
    return;
  }

  let key = inputKey.value;

  if (!key) {
    errorInputKey.innerText = "La clave no puede quedar vacía.";
    return;
  }

  if (input.length % key.length != 0) {
    errorInputText.innerText = "El mensaje cifrado no coincide con la clave.";
  }

  let decoded = _decode(input, key);

  inputCipher.innerText = input;
  inputUncipher.innerText = decoded;
};

const clean = function () {
  inputText.value = null;
  inputKey.value = null;

  errorInputText.innerText = null;
  errorInputKey.innerText = null;

  inputCipher.value = null;
  inputUncipher.value = null;
};

const inputKey = document.getElementById("inputKey");
const inputText = document.getElementById("inputText");
const inputCipher = document.getElementById("inputCipher");
const inputUncipher = document.getElementById("inputUncipher");
const errorInputText = document.getElementById("errorInputText");
const errorInputKey = document.getElementById("errorInputKey");

const ALPH_SIZE = 256;
const HOLDER = "x";
