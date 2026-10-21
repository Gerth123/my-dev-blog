import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './contact.module.css';

const EMAIL = 'kontakt@robin-gerth.de';
const PROFILE_URL = 'https://linkedin.com/in/robin-gerth-47100031b/';

export default function Contact(): ReactNode {
  const mailIcon = useBaseUrl('/img/contact/mail.svg');
  const linkedinIcon = useBaseUrl('/img/contact/linkedin.svg');
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.content}>
        <div>
          <h2 className={styles.heading}>Contact me</h2>
          <p className={styles.intro}>
            Feel free to reach out if you have a job offer or a project in mind:
          </p>
          <ul className={styles.points}>
            <li>I am looking for a role as full stack or DevSecOps engineer.</li>
            <li>I bring experience with e-commerce systems, CI/CD pipelines and AI integration.</li>
            <li>I enjoy teams that value clean code, automation and security.</li>
            <li>I am open to on site work in the Basel region and to remote work.</li>
          </ul>
        </div>

        <div>
          <p className={styles.lead}>Looking forward to hearing from you!</p>
          <ul className={styles.links}>
            <li>
              <img className={styles.icon} src={mailIcon} alt="Email" />
              <a className={styles.mail} href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </li>
            <li>
              <img className={styles.icon} src={linkedinIcon} alt="LinkedIn" />
              <a
                className={styles.profile}
                href={PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer">
                Profile Page
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}