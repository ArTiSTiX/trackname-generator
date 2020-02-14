const { Word, Dictionary, Sentence } = require('./lib/');

const words = [
  new Word('%VRB-INF %NPH', ['TPL']),
  new Word('%NPH-SNG is %VRB-ING', ['TPL']),
  new Word('%NPH-PLU are %VRB-ING', ['TPL']),
  new Word('%NPH-SNG is %VRB-PSP', ['TPL']),
  new Word('%NPH-PLU are %VRB-PSP', ['TPL']),
  new Word('%NPH-SNG %VRB-SNG', ['TPL']),
  new Word('%NPH-PLU %VRB-PLU', ['TPL']),
  new Word('%DET-SNG %NOU-SNG', ['NPH','SNG']),
  new Word('%DET-PLU %NOU-PLU', ['NPH','PLU']),
  new Word('world:worlds', ['NOU','SNG','PLU'], 10),
  new Word('rule:rules:ruled:ruled:ruling', ['VRB','SNG','PLU','PST','PSP','ING','INF'], 1),
  new Word('a', ['DET', 'SNG'], 10),
  new Word('the', ['DET', 'SNG', 'PLU'], 10),
]

const dict = new Dictionary(words);

const sentence = new Sentence(dict);

console.log(sentence.generate());
