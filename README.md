# Track Name Generator

A fun library that can generate Song/Track titles (or any sentence looking like a song phrase) based on a dictionary of rules and words.

This is a Proof-of-Concept made after discussing Post-Rock song titles:

> Remi: How can i name this song improvisation ?
>
> Thomas: Just find any name, there is no lyric, it's post-rock !
>         Take a bunch of words about nature, emotions, abstract concepts, and it will be fine
>
> Remi: like what ?
>
> Thomas: hum.... Above the Mountains
>
> Remi: Between the Seas ?
>
> Thomas: Exactly !
>
> Remi: I should make a generator for that.

It is only based on English language, and provided dictionary example is intended to generate Post-Rock inspired songs.

Results can vary from pure genius:

```text
Known Fragile Childhoods Shout After a Wild Flower
Like Lies Until the Dream
When Two Dreams Speak
Flowers' Time Leaves
When Many Men Look At Their Dream
Some Cried Regrets Were Easily Spoken
Scream Far From a Couple of Regrets
Died and Dreaming
Dying Far From No Fairytales
When No Men Lose
```

To total non-sense:

```text
A Thousand Snows Fast Looked Following True Glory of a Sky
When Noises of Another Died Mad Sun Will Be Dreaming Because of a Man of a Single Unlikely Horse
A Time Becomes Walking
The Ghosts Lose a Sky
No One of the Childhood Feels Hunting
As Following As a Cave of This World
A Few Given Moons Are Soft
Noise of a Girl Dreams That Looked Towards All the Suns
Tomorrow, a Pretty Majestic Horizon of a Single Wind Will Be Orange
A Couple of Cats Will Be Giant
```

## How it works

### Dictionary

A "Word" in the dictionary is a comma-separated line of 3 values:
* A list of tags the word can match, dash-separated ("-")
* the word form / template / string
* a weight for occurence - default = 1

### Sentence Generation

A sentence generation starts with an initial template '%TPL'.

Any placeholder tag, in the form of `%TAG` (with a percent sign) or a combinaison of tags, `%TAG1-TAG2` is then replaced by a random choice in the dictionnary that matches all the given tags.

After replacement, all remaining tags are recursively replaced until no tag are present (forming the final sentence).

### Tags

Tags can have any form, and can have a semantic use:
* **TPL**: a tag to indicate a starting form of sentence
* **NOU**: a Noun with two forms, singular:plural (separated by ":")
* **VRB**: a Verb with five forms, singular:plural:past tense:past participle:present participle (separated by ":")
* **SNG**: indicates that can be singular
* **PLU**: indicates that can be plural
* **PST**: indicates that the verb has past tense
* **PSP**: indicates that the verb has past participle
* **ING**: indicates that the verb has present participle
* **INF**: indicates the singular form can be used as infinitive

*NOTE: NOU, VRB, SNG, PLU, PST, PSP, INF and ING tags logic is hard coded, so that a single line can produce any form of the same word.*

Any other tag exists to help construct complex sentences:

* **NPH**: a noun phrase
* **APH**: an adjective phrase, or participle phrase
* **VPH**: a verb phrase (verb + objects)
* **ADJ**: an adjective
* **CLR**: (semantic) color
* **UND**: (NPH) uncountable noun phrase
* **CNT**: (NOU) countable
* **NCT**: (NOU) uncountable
* **FUT**: (VPH, AVT) future verb phrase
* **PRS**: (VPH, AVT) present verb phrase
* **PST**: (VPH, AVT) past verb phrase
* **STA**: (VRB) stative verb
* **ACT**: (VRB) verb of action
* **OBJ**: (VRB) verb with an indirect object (e.g. "look at smt")
* **TRS**: (VRB) transitive verb (need a direct object like "burn the tree")
* **NTR**: (VRB) non-transitive verb (cannot have an object)
* **AVC**: adverb of quantity
* **AVW**: adverb of location (where) - unused
* **ADV**: adverb
* **PRE**: (ADV) preposition, adverb should be placed before object
* **WHR**: (ADV) adverb of location (where)
* **TIM**: (ADV) adverb of time
* **AVW**: adverb of manner
* **AVF**: adverb of frequency
* **AVT**: adverb of time (but not a preposition)
* **DET**: determinent
* **LOWERCASE**: formatting tag to avoid titlecasing some words

### Weights

Each word can have a weight, giving it more or less importance among others. When selecting possible candidates for given tags, the probability of a word to be selected is `word weight / total weight of selection`. Weight can be any number.

You can also make conditions by defining a tag with empty alternatives.
Example:

* `?APH,%APH,5`: `%?APH` can be replace by `%APH` with a weight of 5
* `?APH,,10`: `%?APH` can be replace by ` ` with a weight of 10

With these rules, tag `%?APH` have 5/15 = 1/3 of chance to be replaced by `%APH`, and 2/3 to be replaced by ` `.

## CLI

Execute the `generate.js` script:

```
node generate.js <dict> <num <--debug> <--excludes>
```

* **dict**: the dictionary to use - "postrock"
* **num**: count of sentences to generate
* **--debug**: activate debug
* **--excludes**: avoid selection of a previously selected word - can be problematic with determinents, or conditions since sentence will then exclude some necessary lines

## Code

Use the Sentence, Dictionary and Word classes to generate a the sentence:

```
const { Word, Dictionary, Sentence } = require('trackname-generator');

const words = [
  new Word('%VRB-INF %NPH', ['TPL']),
  new Word('%NPH-SNG is %VRB-ING', ['TPL']),
  new Word('%NPH-PLU are %VRB-ING', ['TPL']),
  new Word('%NPH-SNG is %VRB-PSP', ['TPL']),
  new Word('%NPH-PLU are %VRB-PSP', ['TPL']),
  new Word('%NPH-SNG %VRB-SNG', ['TPL']),
  new Word('%NPH-PLU %VRB-PLU', ['TPL']),
  new Word('%DET-SNG %NOU-SNG', ['NPH-SNG']),
  new Word('%DET-PLU %NOU-PLU', ['NPH-PLU']),
  new Word('world:worlds', ['NOU','SNG','PLU'], 10),
  new Word('rule:rules:ruled:ruled:ruling', ['VRB','SNG','PLU','PST','PSP','ING','INF'], 1),
  new Word('a', ['DET', 'SNG'], 10),
  new Word('the', ['DET', 'SNG', 'PLU'], 10),
]

const dict = new Dictionary(words);

const sentence = new Sentence(dict);

console.log(sentence.generate());
```
