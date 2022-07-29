import styles from '../styles/pages/Index.module.scss';

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <h1>coop.codes</h1>
        <p>coming soon</p>
        <a
          href="https://twitter.com/intent/follow?screen_name=CooperComputer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow @CooperComputer on Twitter for updates
        </a>
      </div>
    </div>
  );
}
