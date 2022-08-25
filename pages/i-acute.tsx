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
      </div>
    </div>
  );
}
