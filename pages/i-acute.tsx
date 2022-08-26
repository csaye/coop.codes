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
        <h2>Narrowest Letters</h2>
        <p>In addition to a narrow name, we need a narrow TLD. To figure out which are narrowest, let&apos;s measure the letters:</p>
        <div className={styles.narrowest}>
          {
            letters.map((letter, i) =>
              <TextWidth {...letter} key={i} />
            )
          }
        </div>
        <h2>Narrowest TLDs</h2>
        <p>Using this letter data we can figure out the narrowest TLDs currently available for public registration. The 12 narrowest are listed below:</p>
        <table className={styles.table}>
          <tbody>
            {
              bigScreen ?
                <tr>
                  <th>TLD</th>
                  <th>Pixel Width</th>
                  <th>Country</th>
                  <th>Special Characters</th>
                  <th>Available Worldwide</th>
                  <th>Top Level Unreserved</th>
                </tr> :
                <tr className={styles.small}>
                  <th>TLD</th>
                  <th>Pixel Width</th>
                  <th>Special Chars</th>
                  <th>Available Worldwide</th>
                  <th>Top Level Unreserved</th>
                </tr>
            }
            {
              shortTlds.map((tld, i) =>
                <tr
                  key={i}
                  className={tld.tld === 'is' ? styles.winner : undefined}
                >
                  <td>.{tld.tld}</td>
                  <td>{tld.width.toFixed(2)}</td>
                  {bigScreen && <td>{tld.country}</td>}
                  <td>{tld.specialChars ? checkMark : xMark}</td>
                  <td>{tld.worldwide ? checkMark : xMark}</td>
                  <td>{tld.unreserved ? checkMark : xMark}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <p>In addition to being public, the TLD also needs to allow special characters, be available worldwide, and not have 1 character names reserved.</p>
        <p>Based on those factors, Iceland&apos;s <b>.is</b> appears to be the shortest viable TLD.</p>
        <h2>Getting the Domain</h2>
        <p>Out of the six i characters, only í was available under .ís. So I registered it.</p>
        <TextWidth
          text="í.is"
          width={19.78125}
        />
        <p>That means we now have a domain that is less than 20 pixels wide.</p>
        <h2>Making the URL Shortener</h2>
        <p>URL shorteners are typically in the following format:</p>
        <div className={styles.shortener}>
          <span>bit.ly</span>/<span>3c5Op1H</span>
        </div>
        <div>
          <span style={{ margin: '0 8px' }}>domain</span>
          <span style={{ margin: '0 56px' }}>path</span>
        </div>
        <p>The domain is the base of the URL and the path defines the destination.</p>
        <p>For our shortener, we&apos;ll want to shorten the path as much as possible.</p>
        {
          pathLetters.map((letter, i) =>
            <TextWidth {...letter} key={i} />
          )
        }
        <p>There are 16 characters under 4 pixels we can use for the path: j, i, l, capital i, i&apos;s six accented variations, and capital i&apos;s six accented variations.</p>
        <p>Randomly stringing four of these characters together allows for 16<sup>4</sup>, or 65,536, path combinations. That should be plenty for our shortener.</p>
        <h2>í.is</h2>
        <p>So that&apos;s the final structure of our length/width-minimized URL shortener:</p>
        <TextWidth
          text="í.is/ÏIįÎ"
          width={39.890625}
        />
        <p>We were able to create a shortener that brings URLs to just 7 characters and about 40 pixels, shorter and narrower than the vast majority of URLs.</p>
        <h2>How to Access í.is</h2>
        <p>
          The easiest way is to just click on a link or copy-paste:{' '}
        </p>
        <p className={styles.clickCopy}>
          <a
            className="url"
            href="https://í.is"
            target="_blank"
            rel="noopener noreferrer"
          >
            í.is
          </a>
          <Tooltip title={copyText} arrow>
            <ContentCopyIcon
              className={styles.copyLink}
              onClick={() => copyLink('https://í.is')}
            />
          </Tooltip>
        </p>
        <p>Domains with special characters are encoded by the browser. That means you can also type the encoded equivalent to access í.is:</p>
        <p className={styles.clickCopy}>
          <a
            className="url"
            href="https://xn--eda.is"
            target="_blank"
            rel="noopener noreferrer"
          >
            xn--eda.is
          </a>
          <Tooltip title={copyText} arrow>
            <ContentCopyIcon
              className={styles.copyLink}
              onClick={() => copyLink('https://xn--eda.is')}
            />
          </Tooltip>
        </p>
      </div>
    </div>
  );
}
