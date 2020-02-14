const { titleCaseWord } = require('./utils');

class Sentence {
  constructor(dictionary, options = {}) {
    this.dictionary = dictionary;
    this.options = options || {};
  }

  generate(template = '%TPL', prevChosen = []) {
    const parts = template.split(' ');
    
    const rets = [];
    const chosen = [];
    
    for (const part of parts) {
      if (part.startsWith('%')) {
        const tags = part.substring(1).split('-');
        const word = this.dictionary.choose(tags, [...prevChosen, ...chosen]);
        const str = word.generate(tags);

        chosen.push(word.number);
        rets.push(str);
      } else {
        rets.push(part);
      }
    }

    const sentence = rets.join(' ').replace(/\s+/g, ' ');

    if (this.options.debug) {
      console.debug(template, '\n  ->', sentence, `(chosen: ${chosen.join(',')})`);
    } 

    if (sentence.includes('%')) {
      const excluded = this.options.excludes ? [...prevChosen, ...chosen] : [];
      return this.generate(sentence, excluded);
    }

    return this.reformat(sentence);
  }

  reformat(text) {
    const lowercasedWords = this.dictionary.filter(['LOWERCASE']).map(w => w.text);
    
    return titleCaseWord(
      text
        .trim()
        .replace(/(^| )a ([aeiou])/g, '$1an $2')
        .replace(/s 's /g, 's\' ')
        .replace(/ 's /g, '\'s ')
        .replace(/ , /g, ', ')
        .replace(/ are not /g, ' ain\'t ')
        .replace(/ is not /g, ' ain\'t ')
        .replace(/ will not /g, ' won\'t ')
        .replace(/ was not /g, ' wasn\'t ')
        .replace(/ were not /g, ' weren\'t ')
        .split(' ')
        .map(word => lowercasedWords.includes(word) ? word : titleCaseWord(word))
        .join(' ')

      ) 
    ;
  }
}

module.exports = Sentence;
