function titleCaseWord(word) {
  return `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`;
}

function getTotalWeight(words) {
  return words.reduce((sum, word) => sum + word.weight, 0.0);
}  

function weightedRandom(words) {
  const total = getTotalWeight(words);

  const selection = Math.random() * total;
  let sum = 0;
  for (const word of words) {
    if (selection >= sum && selection < (sum + word.weight)) {
      return word
    }
    sum += word.weight;
  }
}

let id = 0;
function uuid() {
  return id++;
}

module.exports.titleCaseWord = titleCaseWord;
module.exports.weightedRandom = weightedRandom;
module.exports.uuid = uuid;
