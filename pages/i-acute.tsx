import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tooltip, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header';
import styles from '../styles/pages/IAcute.module.scss';
import { accentedLetters, letters, pathLetters, TextWidth as TextWidthType } from '../util/letterWidths';
import { shortTlds } from '../util/shortTlds';

function TextWidth(props: TextWidthType) {
  const { text, width } = props;

  return (
    <div className="defaultFont">
      <span>{text}</span>
      <span style={{ fontSize: '12px' }}> ({width.toFixed(2)} pixels)</span>
    </div>
  );
}

export default function IAcute() {
  const [copyText, setCopyText] = useState('Click to copy');

  // big screen media query
  const bigScreen = useMediaQuery('(min-width: 700px)');

  // mark nodes
  const checkMark = <span style={{ color: 'green' }}><b>✓</b></span>;
  const xMark = <span style={{ color: 'red' }}><b>✘</b></span>;

  // copies í.is to the clipboard
  async function copyLink(link: string) {
    await navigator.clipboard.writeText(link);
    setCopyText('Copied');
    setTimeout(() => setCopyText('Click to copy'), 2000);
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.background}>
        <div />
      </div>
      <div className={styles.content}>
        <h1>I-Acute (í.is)</h1>
        <h2>A Literal URL Shortener</h2>
        <p>What if you could shorten URLs by both length <b>and</b> width?</p>
        <div>
          <span style={{ margin: '0 43px' }}>12 chars</span>
          <span style={{ margin: '0 -1px' }}>7 chars</span>
        </div>
        <div className={styles.examples}>
          <span className="defaultFont" style={{ color: 'red' }}>
            ✘ <span>bit.ly/3c5Op1H</span>
          </span>
          <span className="defaultFont" style={{ color: 'green' }}>
            <b className="montserrat">✓</b> <span>í.is/ÏIįÎ</span>
          </span>
        </div>
        <div>
          <span style={{ margin: '0 52px' }}>107px</span>
          <span style={{ margin: '0 5px' }}>40px</span>
        </div>
        <p>How short could a URL get?</p>
        <h2>Short Domain Names</h2>
        <p>The shortest domain currently possible, length-wise, is 3 characters. 1 for the domain name and 2 for the domain ending (TLD). For example:</p>
        <div>
          <span style={{ margin: '0 -10px' }}>name</span>
          <span style={{ margin: '0 20px' }}>TLD</span>
        </div>
        <div className={styles.gco}>
          <span>g</span>.<span>co</span>
        </div>
        <div>
          <span style={{ margin: '0 11px' }}>1</span>
          <span style={{ margin: '0 16px' }}>2</span>
        </div>
        <div>
        </div>
        <p>Realistically, all 3 character letter domains are taken. They&apos;re heavily desired and picked over by the domain community.</p>
        <h2>Special Characters</h2>
        <p>However, some TLDs allow special characters in the name. Special characters are infrequently used and could be our ticket to a short domain.</p>
        <p style={{ fontSize: '14px' }}>à á â ä æ ã å ā ç ć č è é ê ë ē ė ę î ï í ī į ì ł ñ ń ô ö ò ó œ ø ō õ ß ś š û ü ù ú ū ÿ ž ź ż</p>
        <h2>Narrowest Names</h2>
        <p>The accented i characters are the narrowest. That means that the narrowest available name is likely going to be one of these characters:</p>
        <div className={styles.narrowest}>
          {
            accentedLetters.map((letter, i) =>
              <TextWidth {...letter} key={i} />
            )
          }
        </div>
      </div>
    </div>
  );
}
