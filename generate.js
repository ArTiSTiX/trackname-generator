const fs = require('fs');

const Word = require('./lib/word');
const Dictionary = require('./lib/dictionary');
const Sentence = require('./lib/sentence');

const [
  _,
  __,
  dictName = 'postrock',
  count = '1',
  ...options
] = process.argv;

function generate() {
  let words;
  const debug = options.includes('--debug');
  const excludes = options.includes('--excludes');

  try {
    // read contents of the file
    const data = fs.readFileSync(`./dictionaries/${dictName}.txt`, 'UTF-8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    // print all lines
    words = lines.map((line, index) => Word.parseLine(line, index)).filter(Boolean);
  } catch (err) {
    console.error(`Dictionary ${dictName} does not exists`);
    process.exit(1);
  }

  const dict = new Dictionary(words);
  const sentence = new Sentence(dict, { debug, excludes });
  const output = sentence.generate();
  
  if (debug) {
    console.debug(`\n---------\n${output}\n---------\n`)
  } else {
    console.log(output);
  }
}

for (let i = 0; i < (Number(count) || 1); i++) {
  generate();
}

