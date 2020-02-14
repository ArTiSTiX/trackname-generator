const { uuid } = require('./utils');

class Word {
  constructor(text, tags, weight, number) {
    this.text = text || '';
    this.tags = tags;
    this.weight = weight || 1;
    this.number = number || uuid();
  }

  static parseLine(line, lineNb) {
    if (!line || line.startsWith('#')) return null;

    const [lineTags, lineText, weightStr] = line.replace('\\,','%COMMA').split(',');

    const tags = lineTags.trim().split('-');
    const text = lineText.trim().replace('%COMMA', ',')
    const weight = Number(weightStr) || 1;
    const number = lineNb;

    return new Word(text, tags, weight, number);
  }

  is(tags) {
    return tags.every(tag => this.tags.includes(tag));
  }

  generate(tags) {
    const parts = this.text.split(':');

    if (tags.includes('NOU')) {
      if (tags.includes('SNG')) {
        return parts[0];
      }
      if (tags.includes('PLU')) {
        return parts[1];
      }
      return parts[0];
    }

    if (tags.includes('VRB')) {
      if (tags.includes('SNG')) {
        return parts[1];
      }
      if (tags.includes('PST')) {
        return parts[2];
      }
      if (tags.includes('PSP')) {
        return parts[3];
      }
      if (tags.includes('ING')) {
        return parts[4];
      }

      return parts[0];
    }

    return this.text;
  }
}

module.exports = Word;
