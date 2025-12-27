import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';

import Translate from '@docusaurus/Translate';

import styles from './styles.module.css';

type FeatureItem = {
  title: ReactNode;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: <Translate id="homepage.features.knowledgeCenter.title">Developer Knowledge Center</Translate>,
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <Translate id="homepage.features.knowledgeCenter.description">
        The single source of truth. Always up-to-date API specs, SDK references, and tool guides.
      </Translate>
    ),
  },
  {
    title: <Translate id="homepage.features.docs.title">Clear, Comprehensive Docs</Translate>,
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <Translate id="homepage.features.docs.description">
        From Quickstart to production-ready implementations, with real-world examples.
      </Translate>
    ),
  },
  {
    title: <Translate id="homepage.features.partner.title">Your Evolving Learning Partner</Translate>,
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <Translate id="homepage.features.partner.description">
        Release-aware content covering migrations, best practices, and troubleshooting.
      </Translate>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
