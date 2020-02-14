const { weightedRandom } = require('./utils');

class Dictionary {
  constructor(words) {
    this.words = words;
  }

  filter(tags, excluded = []) {
    const possibles = this.words.filter(word => word.is(tags));
    const withoutExcluded = possibles.filter(word => !excluded.includes(word.number));

    // Ensure exlusions does not reduce to no possibles
    if (withoutExcluded.length) return withoutExcluded;
    
    return possibles;
  }

  choose(tags, excluded = []) {
    const possibles = this.filter(tags, excluded);
    if (!possibles.length) {
      throw new Error(`cannot find any words for ${tags}`);
    }

    return weightedRandom(possibles);
  }
}

module.exports = Dictionary;
