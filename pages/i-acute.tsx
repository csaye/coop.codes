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
  return (
    <div className={styles.container}>
    </div>
  );
}
