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
  return (
    <div className={styles.container}>
    </div>
  );
}
