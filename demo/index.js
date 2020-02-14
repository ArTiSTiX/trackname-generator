import './styles.css';
import { Dictionary, Word, Sentence } from '../lib';
import postRockDictonary from '../dictionaries/postrock.txt';
import { fetch as fetchPolyfill } from 'whatwg-fetch'

if (!window.fetch) {
  fetchPolyfill();
}

const loadDictionary = () => {
  try {
    const data = postRockDictonary;
    const lines = data.split(/\r?\n/);
    words = lines.map((line, index) => Word.parseLine(line, index)).filter(Boolean);
  } catch (err) {
    console.error(`Dictionary ${dictName} does not exists`);
    process.exit(1);
  }

  const dict = new Dictionary(words);
  const sentence = new Sentence(dict, { debug: true, excludes: false });

  return sentence;
}

const loadBackgroundImage = () => {
  window.fetch('https://www.reddit.com/r/EarthPorn/random.json')
    .then((response) => { return response.json(); }).then(function(redditPost) {
      console.log(redditPost[0].data.children[0].data)
      const redditImage = redditPost[0].data.children[0].data.url;
      const redditPermalink = redditPost[0].data.children[0].data.permalink;
      const redditTitle = redditPost[0].data.children[0].data.title;
      const redditAuthor = redditPost[0].data.children[0].data.author;

      const $background = document.getElementById('background');
      $background.style.backgroundImage = `url("${redditImage}")`;
      

      const $redditLink = document.getElementById('redditLink');
      $redditLink.innerHTML = redditTitle;
      $redditLink.href = `https://reddit.com${redditPermalink}`;

      const $redditAuthor = document.getElementById('redditAuthor');
      $redditAuthor.innerHTML = `/u/${redditAuthor}`;
      $redditAuthor.href = `https://reddit.com/u/${redditAuthor}`;

      const $redditContainer = document.getElementById('reddit');

      var img = new Image();
      img.onload = function () {
        $background.classList.add('loaded');
        $redditContainer.classList.add('loaded');
      }
      img.src = redditImage;
    });
}

const sentence = loadDictionary('postrock');

window.addEventListener('DOMContentLoaded', () => {
  const $trackNameContainer = document.getElementById('trackName');

  $trackNameContainer.innerHTML = sentence.generate();
  loadBackgroundImage();
});
