import { ReactNode, useEffect, useState } from 'react';
import styles from '../styles/pages/DomainHacker.module.scss';
import { getFillerHacks } from '../util/fillerHacks';
import { namecheapTlds } from '../util/namecheapTlds';
import { tlds } from '../util/tlds';

type Hack = {
  available: 'loading' | undefined | true | false,
  tld: string,
  domain: string,
  node: ReactNode
};

type FillerHack = {
  domain: string,
  color: string
};

export default function DomainHacker() {
  const [word, setWord] = useState('');
  const [foundHacks, setHacks] = useState<Hack[]>([]);
  const [fillerHacks, setFillerHacks] = useState<FillerHack[]>([]);

  // mark nodes
  const checkMark = <span style={{ color: 'green' }}><b>✓</b></span>;
  const xMark = <span style={{ color: 'red' }}><b>✘</b></span>;
  const dotsMark = <span style={{ color: 'gray' }}><b>…</b></span>;
  const questionMark = <span style={{ color: 'goldenrod' }}><b>?</b></span>;
  const dotMark = <span style={{ color: 'black' }}><b> • </b></span>;

  // get filler hacks on start
  useEffect(() => {
    // shuffles given array
    function shuffleArray(array: any[]) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    // returns a random code color
    let lastRand: number;
    function randomColor() {
      const colors = ['#F8F8F2', '#75715E', '#F92672', '#FD971F', '#E69F66', '#E6DB74', '#A6E22E', '#66D9EF', '#AE81FF'];
      let rand;
      do { rand = Math.floor(Math.random() * colors.length); } while (rand === lastRand);
      lastRand = rand;
      return colors[rand];
    }
    // shuffle and set filler hacks
    const hacks = getFillerHacks();
    shuffleArray(hacks);
    setFillerHacks(hacks.map(hack => ({ domain: hack, color: randomColor() })));
  }, []);

  // finds hacks for given word
  async function findHacks(word: string) {
    // clean up word
    word = word.toLowerCase();
    word = word.replace(/[^a-z]+/g, '');
    // verify word
    if (!word) {
      window.alert('Please enter letter characters.');
      return;
    }
    if (word.length < 2) {
      window.alert('Please enter at least 2 letters.');
      return;
    }
    // find hacks
    let hacks: Hack[] = [];
    for (let i = word.length - 1; i > 1; i--) {
      const start = word.slice(0, i);
      const end = word.slice(i);
      for (const tld of tlds) {
        if (tld.startsWith(end)) {
          const domain = `${start}.${tld}`;
          const tldStart = tld.slice(0, end.length);
          const tldEnd = tld.slice(end.length);
          const node = <span><b>{start}</b>.<b>{tldStart}</b>{tldEnd}</span>;
          hacks.push({ available: 'loading', tld, domain, node });
        }
      }
    }
    // sort and set hacks
    hacks = hacks.sort((a, b) => a.domain > b.domain ? 1 : -1);
    hacks = hacks.sort((a, b) => a.domain.length - b.domain.length);
    setHacks(hacks);
    // set hack availability status
    hacks.forEach(async (hack, i) => {
      const newHacks = hacks.slice();
      const response = await fetch(`/api/whois?domain=${hack.domain}`);
      let json;
      try {
        json = await response.json();
      } catch (e) {
        json = null;
      }
      newHacks[i].available = json?.isAvailable;
      setHacks(newHacks);
    });
    // alert if no hacks found
    if (!hacks.length) window.alert('No hacks found.');
  }

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        {
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
          <p>For example: internet ⮕ inter.net</p>
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
            <button>
              Find Hacks
            </button>
          </form>
        </div>
        <div className={styles.hacks}>
          {
            foundHacks.map((hack, i) =>
              <p key={i}>
                {
                  hack.available === true ? checkMark :
                    hack.available === false ? xMark :
                      hack.available === 'loading' ? dotsMark :
                        questionMark
                }
                {' '}
                {hack.node}
                {dotMark}
                <a
                  href={`https://tld-list.com/tld/${hack.tld}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  .{hack.tld} registrars ☞
                </a>
                {
                  namecheapTlds.includes(hack.tld) &&
                  <>
                    {dotMark}
                    <a
                      href={`https://www.namecheap.com/domains/registration/results/?domain=${hack.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Namecheap ☞
                    </a>
                  </>
                }
              </p>
            )
          }
        </div>
      </div>
    </div>
  );
}
