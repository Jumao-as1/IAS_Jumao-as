document.addEventListener('DOMContentLoaded', function () {
    const inputText = document.getElementById('input-text');
    const resultDiv = document.getElementById('result');
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const clearBtn = document.getElementById('clear-btn');
  
    const letterPairs = [
      { range: ['A', 'B'], shift: 3 },
      { range: ['C', 'D'], shift: 6 },
      { range: ['E', 'F'], shift: 3 },
      { range: ['G', 'H'], shift: 6 },
      { range: ['I', 'J'], shift: 3 },
      { range: ['K', 'L'], shift: 6 },
      { range: ['M', 'N'], shift: 3 },
      { range: ['O', 'P'], shift: 6 },
      { range: ['Q', 'R'], shift: 3 },
      { range: ['S', 'T'], shift: 6 },
      { range: ['U', 'V'], shift: 3 },
      { range: ['W', 'X'], shift: 6 },
      { range: ['Y', 'Z'], shift: 3 }
    ];
  
    const getShift = function (char) {
      if (!char.match(/[a-zA-Z]/)) {
        return { shift: 0, isLetter: false };
      }
  
      const upperChar = char.toUpperCase();
  
      for (const pair of letterPairs) {
        if (upperChar >= pair.range[0] && upperChar <= pair.range[1]) {
          return { shift: pair.shift, isLetter: true };
        }
      }
  
      return { shift: 0, isLetter: true };
    };
  
    const getOriginalPair = function (char) {
      if (!char.match(/[a-zA-Z]/)) {
        return { shift: 0, isLetter: false };
      }
  
      const upperChar = char.toUpperCase();
      const code = upperChar.charCodeAt(0);
  
      for (const pair of letterPairs) {
        const shift = pair.shift;
        const range = pair.range;
  
        const rangeStart = range[0].charCodeAt(0);
        const rangeEnd = range[1].charCodeAt(0);
  
        let originalPos = (code - 65 - shift + 26) % 26 + 65;
  
        if (originalPos >= rangeStart && originalPos <= rangeEnd) {
          return { shift: shift, isLetter: true };
        }
      }
  
      return { shift: 3, isLetter: true };
    };
  
    const encrypt = function (text) {
      let result = '';
  
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const { shift, isLetter } = getShift(char);
  
        if (!isLetter) {
          result += char;
          continue;
        }
  
        const isUpperCase = char === char.toUpperCase();
        const baseCode = isUpperCase ? 65 : 97;
  
        const position = char.toUpperCase().charCodeAt(0) - 65;
        const newPosition = (position + shift) % 26;
        const newChar = String.fromCharCode(baseCode + newPosition);
  
        result += newChar;
      }
  
      return result;
    };
  
    const decrypt = function (text) {
      let result = '';
  
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
  
        if (!char.match(/[a-zA-Z]/)) {
          result += char;
          continue;
        }
  
        if (char.toUpperCase() === 'P') {
          result += char === 'P' ? 'M' : 'm'; continue;
        } else if (char.toUpperCase() === 'D') {
          result += char === 'D' ? 'A' : 'a'; continue;
        } else if (char.toUpperCase() === 'U') {
          result += char === 'U' ? 'R' : 'r'; continue;
        } else if (char.toUpperCase() === 'Q') {
          result += char === 'Q' ? 'K' : 'k'; continue;
        } else if (char.toUpperCase() === 'R') {
          result += char === 'R' ? 'L' : 'l'; continue;
        } else if (char.toUpperCase() === 'H') {
          result += char === 'H' ? 'E' : 'e'; continue;
        } else if (char.toUpperCase() === 'Y') {
          result += char === 'Y' ? 'S' : 's'; continue;
        } else if (char.toUpperCase() === 'Z') {
          result += char === 'Z' ? 'T' : 't'; continue;
        }
  
        const { shift, isLetter } = getOriginalPair(char);
        const isUpperCase = char === char.toUpperCase();
        const baseCode = isUpperCase ? 65 : 97;
  
        const position = char.toUpperCase().charCodeAt(0) - 65;
        const newPosition = (position - shift + 26) % 26;
        const newChar = String.fromCharCode(baseCode + newPosition);
  
        result += newChar;
      }
  
      return result;
    };
  
    encryptBtn.addEventListener('click', function () {
      const text = inputText.value;
      const encrypted = encrypt(text);
      resultDiv.textContent = encrypted;
    });
  
    decryptBtn.addEventListener('click', function () {
      const text = inputText.value;
      const decrypted = decrypt(text);
      resultDiv.textContent = decrypted;
    });
  
    clearBtn.addEventListener('click', function () {
      inputText.value = '';
      resultDiv.textContent = '';
    });
  
    inputText.placeholder = "Try 'MARK LESTER' or 'PDUQ RHYZHU'";
  });
  