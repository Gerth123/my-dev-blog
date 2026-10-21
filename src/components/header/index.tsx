import {useEffect, useState} from 'react';
import type {ReactNode} from 'react';

import styles from './header.module.css';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  {label: 'About me', href: '#about'},
  {label: 'My skills', href: '#skills'},
  {label: 'My projects', href: '#projects'},
  {label: 'Contact', href: '#contact'},
];

export default function Header(): ReactNode {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = (): void => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 80);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const renderLinks = (onClick?: () => void): ReactNode =>
    navLinks.map((link) => (
      <li key={link.href}>
        <a href={link.href} onClick={onClick}>
          {link.label}
        </a>
      </li>
    ));

  return (
    <header className={`${styles.header} ${hidden && !menuOpen ? styles.hidden : ''}`}>
      <nav className={styles.nav}>
        <ul className={styles.links}>{renderLinks()}</ul>
        <button
          className={styles.burger}
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}>
          <svg width="30" height="32" viewBox="0 0 30 32" aria-hidden="true">
            <path d="M0 2h30M0 16h30M0 30h30" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className={styles.overlay}>
          <button
            className={styles.close}
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2 2l20 20M22 2L2 22" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          <ul>{renderLinks(() => setMenuOpen(false))}</ul>
        </div>
      )}
    </header>
  );
}