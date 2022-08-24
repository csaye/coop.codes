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
    </div>
  );
}
