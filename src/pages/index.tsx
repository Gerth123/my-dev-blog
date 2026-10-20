import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import '@fontsource-variable/quicksand';
import Header from '@site/src/components/header';
import styles from './index.module.css';

export default function Home(): ReactNode {
  return (
    <>
      <Head>
        <title>Robin Gerth | Portfolio</title>
        <meta name="description" content="Portfolio of Robin Gerth" />
      </Head>
      <Header />
      <main className={styles.portfolio}></main>
    </>
  );
}