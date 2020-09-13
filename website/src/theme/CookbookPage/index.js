import React from 'react';

import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import MDXComponents from '@theme/MDXComponents';
import {MDXProvider} from '@mdx-js/react';
import TOC from '@theme/TOC';

import classnames from 'classnames';
import readingTime from 'reading-time';
import styles from './styles.module.css';

const LINK_CLASS_NAME = 'contents__link';

/* eslint-disable jsx-a11y/control-has-associated-label */
function Headings({headings, isChild}) {
  if (!headings.length) return null;
  return (
    <ul className={isChild ? '' : 'contents contents__left-border'}>
      {headings.map(heading => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={LINK_CLASS_NAME}
            dangerouslySetInnerHTML={{__html: heading.value}}
          />
          <Headings isChild headings={heading.children} />
        </li>
      ))}
    </ul>
  );
}

function CookbookPage(props) {
  const {content: CookbookContents} = props;
  const {frontMatter, metadata} = CookbookContents;
  const {title} = frontMatter;
  const {keywords} = metadata;
  const readingStats = readingTime(CookbookContents.toString());

  return (
    <Layout title={metadata.title} description={metadata.description} keywords={keywords}>
      <div className="container">
        <div className="row">
          <div className="col">
            <article className={styles.cookbookContainer}>
              <header className={classnames(styles.header, 'margin-top--xl')}>
                <h1 className={styles.cookbookTitle}>{title}</h1>
                <p className={styles.cookbookDescription}>{metadata.description}</p>
                <p className={styles.cookbookTimeToRead}>{readingStats.text}</p>
              </header>
              <div className="container container--narrow container--bleed margin-vert--xl">
                <section className="markdown">
                  <MDXProvider components={MDXComponents}><CookbookContents /></MDXProvider>
                </section>
                <Link to="/cookbooks" className="button button--outline button--primary margin-vert--lg">Find more cookbooks</Link>
              </div>
            </article>
          </div>
          {CookbookContents.rightToc && (
            <div className="col col--2">
              <TOC headings={CookbookContents.rightToc} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default CookbookPage;
