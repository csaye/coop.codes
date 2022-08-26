import { useEffect, useState } from 'react';
import Header from '../components/Header';
import styles from '../styles/pages/AddAWord.module.scss';
import { adjectives } from '../util/adjectives';
import { adverbs } from '../util/adverbs';
import { shuffleArray } from '../util/array';
import { nouns } from '../util/nouns';
import { verbs } from '../util/verbs';

// number of results shown
const resultCount = 50;
const halfCount = Math.floor(resultCount / 2);

type Result = {
  domain: string,
  available: 'loading' | undefined | true | false
}

type FillerWord = {
  text: string,
  color: string
};

export default function AddAWord() {
  const [baseWord, setBaseWord] = useState('');
  const [modifier, setModifier] = useState('adj-a');
  const [tld, setTld] = useState('com');
  const [results, setResults] = useState<Result[]>();
  const [fillerWords, setFillerWords] = useState<FillerWord[]>();

  // mark nodes
  const checkMark = <span style={{ color: 'green' }}><b>✓</b></span>;
  const xMark = <span style={{ color: 'red' }}><b>✘</b></span>;
  const dotsMark = <span style={{ color: 'gray' }}><b>…</b></span>;
  const questionMark = <span style={{ color: 'goldenrod' }}><b>?</b></span>;

  // get filler words on start
  useEffect(() => {
    // returns a random code color
    let lastRand: number;
    function randomColor() {
      const colors = ['#F8F8F2', '#75715E', '#F92672', '#FD971F', '#E6DB74', '#A6E22E', '#66D9EF', '#AE81FF'];
      let rand;
      // prevent same color twice in a row
      do { rand = Math.floor(Math.random() * colors.length); } while (rand === lastRand);
      lastRand = rand;
      return colors[rand];
    }
    // shuffle and set filler words
    const allWords = [...adjectives, ...adverbs, ...nouns, ...verbs];
    let words: string[] = [];
    for (const word of allWords) {
      if (!words.includes(word)) words.push(word);
    }
    shuffleArray(words);
    setFillerWords(words.map(word => ({ text: word, color: randomColor() })));
  }, []);

  // finds domains with given word and modifier
  function findDomains() {
    // clean up word
    let base = baseWord.toLowerCase();
    base = base.replace(/[^a-z0-9]+/g, '');
    // verify word
    if (!base) {
      window.alert('Word must contain letter or number characters.');
      return;
    }
    // capitalizes given word
    function capitalize(word: string) {
      if (!word.length) return '';
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
    const words = {
      adj: adjectives, adv: adverbs, noun: nouns, verb: verbs
    }[modifier.split('-')[0]];
    if (!words) return;
  }

  return (
    <div className={styles.container}>
    </div>
  );
}
