import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import '@fontsource-variable/quicksand';
import styles from './index.module.css';
import Header from '@site/src/components/header';
import Hero from '@site/src/components/hero';
import MySkills from '@site/src/components/my-skills';
import ProjectHighlights from '@site/src/components/project-highlights';
import Contact from '@site/src/components/contact';
import Footer from '@site/src/components/footer';

export default function Home(): ReactNode {
  return (
    <>
      <Head>
        <title>Robin Gerth | Portfolio</title>
        <meta name="description" content="Portfolio of Robin Gerth" />
      </Head>
      <Header />
      <main className={styles.portfolio}>
        <Hero />
        <MySkills />
        <ProjectHighlights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}