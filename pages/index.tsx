import { Email, GitHub, Twitter } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import KofiButton from '../components/KofiButton';
import Snake from '../components/Snake';
import styles from '../styles/pages/Index.module.scss';

export default function Index() {
  const [fade, setFade] = useState(false);

  // prevent body overflow
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <div className={styles.container}>
      <Snake fade={fade} setFade={setFade} />
      <div
        style={{ opacity: fade ? 0 : 1 }}
        className={styles.kofiButton}
      >
        <KofiButton />
      </div>
      <div className={styles.content}>
        <div
          className={styles.center}
          style={fade ? { opacity: 0.5 } : {}}
        >
          <h1>
            <span>&gt;{' '}</span>
            {
              'coop.codes'.split('').map((char, i) =>
                <span
                  style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                  key={i}
                >
                  {char}
                </span>
              )
            }
          </h1>
          <p>coming soon</p>
          <div className={styles.icons}>
            <a
              href="https://github.com/csaye"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub />
            </a>
            <a
              href="mailto:hi@coop.codes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Email />
            </a>
            <a
              href="https://twitter.com/CooperComputer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
