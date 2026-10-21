import type {ReactNode} from 'react';

import styles from './footer.module.css';

const LEGAL_NOTICE_URL = 'https://robin-gerth.de/en/legal-notice';

export default function Footer(): ReactNode {
  const scrollToTop = (): void => window.scrollTo({top: 0, behavior: 'smooth'});

  return (
    <footer className={styles.footer}>
      <button className={styles.toTop} aria-label="Scroll to top" onClick={scrollToTop}>
        ↑
      </button>
      <p className={styles.copyright}>© Robin Gerth {new Date().getFullYear()}</p>
      <a
        className={styles.legal}
        href={LEGAL_NOTICE_URL}
        target="_blank"
        rel="noopener noreferrer">
        Legal notice
      </a>
    </footer>
  );
}