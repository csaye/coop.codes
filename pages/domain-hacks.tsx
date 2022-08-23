import { ReactNode, useEffect, useState } from 'react';
import HomeLink from '../components/HomeLink';
import KofiButton from '../components/KofiButton';
import styles from '../styles/pages/DomainHacks.module.scss';
import { shuffleArray } from '../util/array';
import { getFillerHacks } from '../util/fillerHacks';
import { namecheapTlds } from '../util/namecheapTlds';
import { tlds } from '../util/tlds';

type Hack = {
  available: 'loading' | undefined | true | false,
  tld: string,
  domain: string,
  url: string,
  node: ReactNode
};

type FillerHack = {
  domain: string,
  color: string
};

export default function DomainHacker() {
  const [word, setWord] = useState('');
  const [fullHacks, setFullHacks] = useState<Hack[]>([]);
  const [partHacks, setPartHacks] = useState<Hack[]>([]);
  const [fillerHacks, setFillerHacks] = useState<FillerHack[]>();

  // mark nodes
  const checkMark = <span style={{ color: 'green' }}><b>✓</b></span>;
  const xMark = <span style={{ color: 'red' }}><b>✘</b></span>;
  const dotsMark = <span style={{ color: 'gray' }}><b>…</b></span>;
  const questionMark = <span style={{ color: 'goldenrod' }}><b>?</b></span>;

  // get filler hacks on start
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
    // shuffle and set filler hacks
    const hacks = getFillerHacks();
    shuffleArray(hacks);
    setFillerHacks(hacks.map(hack => ({ domain: hack, color: randomColor() })));
  }, []);

  // returns full hacks for given word
  function getFullHacks(word: string) {
    let hacks: Hack[] = [];
    // get full hacks
    for (let i = word.length - 1; i > 0; i--) {
      const start = word.slice(0, i);
      const end = word.slice(i);
      for (const tld of tlds) {
        if (tld.startsWith(end)) {
          const domain = `${start}.${tld}`;
          const tldStart = tld.slice(0, end.length);
          const tldEnd = tld.slice(end.length);
          const node = <span><b>{start}</b>.<b>{tldStart}</b>{tldEnd}</span>;
          hacks.push({ available: 'loading', tld, domain, node, url: domain });
        }
      }
    }
    // sort and return hacks
    hacks = hacks.sort((a, b) => a.domain > b.domain ? 1 : -1);
    hacks = hacks.sort((a, b) => a.domain.length - b.domain.length);
    return hacks;
  }

  // pushes path hacks for given word
  function getPathHacks(word: string, hacks: Hack[]) {
    // get path hacks
    for (let i = word.length - 2; i > 0; i--) {
      for (let j = i + 2; j < word.length; j++) {
        const start = word.slice(0, i);
        const tld = word.slice(i, j);
        const end = word.slice(j);
        if (tlds.includes(tld)) {
          const domain = `${start}.${tld}`;
          if (hacks.some(hack => hack.domain === domain)) continue;
          const url = `${domain}/${end}`;;
          const node = <span><b>{start}</b>.<b>{tld}</b>/<b>{end}</b></span>;
          hacks.push({ available: 'loading', tld, domain, node, url });
        }
      }
    }
  }

  // returns part hacks for given word
  function getPartHacks(word: string) {
    let hacks: Hack[] = [];
    getPathHacks(word, hacks);
    // get vowel cut words
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    while (vowels.some(vowel => word.includes(vowel))) {
      for (let i = word.length - 1; i > 0; i--) {
        if (vowels.includes(word[i])) {
          word = word.slice(0, i) + word.slice(i + 1);
          break;
        }
      }
      if (word.length < 2) continue;
      // get vowel cut path hacks
      getPathHacks(word, hacks);
      // get vowel cut full hacks
      for (let i = word.length - 2; i > 0; i--) {
        const start = word.slice(0, i);
        const end = word.slice(i);
        for (const tld of tlds) {
          if (tld === end) {
            const domain = `${start}.${tld}`;
            const tldStart = tld.slice(0, end.length);
            const tldEnd = tld.slice(end.length);
            const node = <span><b>{start}</b>.<b>{tldStart}</b>{tldEnd}</span>;
            hacks.push({ available: 'loading', tld, domain, node, url: domain });
          }
        }
      }
    }
    // sort and return hacks
    hacks = hacks.sort((a, b) => a.domain < b.domain ? 1 : -1);
    hacks = hacks.sort((a, b) => b.url.length - a.url.length);
    return hacks;
  }

  // finds hacks for given word
  async function findHacks(word: string) {
    // clean up word
    word = word.toLowerCase();
    word = word.replace(/[^a-z]+/g, '');
    // verify word
    if (!word) {
      window.alert('Word must contain letter characters.');
      return;
    }
    if (word.length < 2) {
      window.alert('Word must be at least 2 letters.');
      return;
    }
    // get and set hacks
    const fullHacks = getFullHacks(word);
    setFullHacks(fullHacks);
    const partHacks = getPartHacks(word);
    setPartHacks(partHacks);
    // set hack availability status
    fullHacks.forEach(async (hack, i) => {
      const newHacks = fullHacks.slice();
      const response = await fetch(`/api/whois?domain=${hack.domain}`);
      let json;
      try {
        json = await response.json();
      } catch (e) {
        json = null;
      }
      newHacks[i].available = json?.isAvailable;
      setFullHacks(newHacks);
    });
    // set part hack availability status
    partHacks.forEach(async (hack, i) => {
      const newHacks = partHacks.slice();
      const response = await fetch(`/api/whois?domain=${hack.domain}`);
      let json;
      try {
        json = await response.json();
      } catch (e) {
        json = null;
      }
      newHacks[i].available = json?.isAvailable;
      setPartHacks(newHacks);
    });
    // alert if no hacks found
    if (!fullHacks.length && !partHacks.length) window.alert('No hacks found.');
  }

  return (
    <div className={styles.container}>
      <HomeLink color="#fff" />
      <KofiButton />
      <div className={styles.background}>
        {
          fillerHacks &&
          fillerHacks.map((hack, i) =>
            <span style={{ color: hack.color }} key={i}>
              {hack.domain}
            </span>
          )
        }
      </div>
      <div className={styles.content}>
        <div className={styles.head}>
          <h1>Domain Hacks</h1>
          <h2>What is a domain hack?</h2>
          <p>A domain hack is a domain name that spells out a word.</p>
          <p>For example: internet → inter.net</p>
          <h2>Find your own domain hack:</h2>
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
              findHacks(word);
            }}
          >
            <input
              value={word}
              onChange={e => setWord(e.target.value)}
              placeholder="word"
              required
            />
            <button className="blueButton">
              Find Hacks
            </button>
          </form>
        </div>
        <div className={styles.hacks}>
          {
            [fullHacks, partHacks].map((hacks, i) =>
              <div key={i}>
                {
                  hacks.map((hack, i) =>
                    <p key={i}>
                      {
                        hack.available === true ? checkMark :
                          hack.available === false ? xMark :
                            hack.available === 'loading' ? dotsMark :
                              questionMark
                      }
                      {' '}
                      <a
                        href={
                          namecheapTlds.includes(hack.tld) ?
                            `https://www.namecheap.com/domains/registration/results/?domain=${hack.domain}` :
                            `https://regery.com/en/domains/search/${hack.domain}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {hack.node}
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
