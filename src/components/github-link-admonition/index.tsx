import React, {ReactNode} from 'react';
import Admonition from '@theme/Admonition';
import GithubIcon from '/static/img/github.svg';


type AdmonitionType = "info" | "tip" | "warning" | "note" | "danger";

interface GithubLinkAdmonitionProps {
  link: string;
  text?: string;
  type?: AdmonitionType;
  title?: string;
  children?: ReactNode
};

const GithubLinkAdmonition = ({
  link,
  text=link,
  type="info",
  title="Github",
  children
 }: GithubLinkAdmonitionProps) => {
  return (
    <Admonition icon={<GithubIcon />} title={title} type={type}>
      <p>
        <span
          style={{
            fontWeight: 'bold'
          }}
        >
          URL
        </span>
        :&nbsp;
        <a href={link} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      </p>

      {children && (
        <span>
          {children}
        </span>
      )}
    </Admonition>
  );
};

export default GithubLinkAdmonition;
