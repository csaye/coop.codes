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
    shuffleArray(words);
    let domains: Result[] = [];
    words.slice(0, resultCount).forEach(word => {
      const wordA = capitalize(base);
      const wordB = capitalize(word);
      const domain = modifier.split('-')[1] === 'a' ? wordA + wordB : wordB + wordA;
      domains.push({ available: 'loading', domain: `${domain}.${tld}` });
    });
    setResults(domains);
    // set domain availability status
    domains.forEach(async (result, i) => {
      const newDomains = domains.slice();
      const response = await fetch(`/api/whois?domain=${result.domain}`);
      let json;
      try {
        json = await response.json();
      } catch (e) {
        json = null;
      }
      newDomains[i].available = json?.isAvailable;
      setResults(newDomains);
    });
  }

  // returns an example result for current data
  function exampleResult() {
    // get example modifier
    const exampleModifier = {
      adj: 'happy', adv: 'quickly', noun: 'apple', verb: 'think'
    }[modifier.split('-')[0]];
    if (!exampleModifier) return;
    // construct domain
    const wordA = capitalize(baseWord);
    const wordB = capitalize(exampleModifier);
    const domain = modifier.split('-')[1] === 'a' ? wordA + wordB : wordB + wordA;
    return `${domain}.${tld}`;
  }

  return (
    <div className={styles.container}>
      <Header light />
      <div className={styles.background}>
        {
          fillerWords &&
          fillerWords.map((word, i) =>
            <span style={{ color: word.color }} key={i}>
              {word.text}
            </span>
          )
        }
      </div>
      <div className={styles.content}>
        <h1>Add a Word</h1>
        <p>Generate domain ideas by adding a word to your keyword.</p>
        <div className={styles.markKey}>
          <p>
            <span>{checkMark} available</span>
            <span>{xMark} taken</span>
            <span>{questionMark} unknown</span>
            <span>{dotsMark} loading</span>
          </p>
          <p><i>* availability data may not be 100% accurate.</i></p>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            findDomains();
          }}
        >
          <div>
            <input
              value={baseWord}
              onChange={e => setBaseWord(e.target.value)}
              placeholder="word"
              required
            />
            <select
              value={modifier}
              onChange={e => setModifier(e.target.value as Modifier)}
            >
              <option value="adj-a">Adjective After</option>
              <option value="adv-a">Adverb After</option>
              <option value="noun-a">Noun After</option>
              <option value="verb-a">Verb After</option>
              <option value="adj-b">Adjective Before</option>
              <option value="adv-b">Adverb Before</option>
              <option value="noun-b">Noun Before</option>
              <option value="verb-b">Verb Before</option>
            </select>
            <select value={tld} onChange={e => setTld(e.target.value)}>
              <option value="com">.com</option>
              <option value="net">.net</option>
              <option value="org">.org</option>
            </select>
          </div>
          {baseWord && <p><span>example result:</span> {exampleResult()}</p>}
          <button className="blueButton">
            Find Domains
          </button>
        </form>
        <div className={styles.results}>
          {
            results &&
            Array(2).fill(null).map((v, i) =>
              <div key={i}>
                {
                  results
                    .slice(i * halfCount, (i + 1) * halfCount)
                    .map((result, i) =>
                      <p key={i}>
                        {
                          result.available === true ? checkMark :
                            result.available === false ? xMark :
                              result.available === 'loading' ? dotsMark :
                                questionMark
                        }
                        {' '}
                        <a
                          href={`https://www.namecheap.com/domains/registration/results/?domain=${result.domain.toLowerCase()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {result.domain}
                        </a>
                      </p>
                    )
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
