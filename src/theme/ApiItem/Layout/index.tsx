import React, {type JSX, type ReactNode} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {useWindowSize} from '@docusaurus/theme-common';
import ContentVisibility from '@theme/ContentVisibility';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import DocItemContent from '@theme/DocItem/Content';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocVersionBanner from '@theme/DocVersionBanner';
import clsx from 'clsx';
import DocLLMActions from '@site/src/components/DocLLMActions';

import styles from './styles.module.css';

type Props = {
  children: ReactNode;
};

function useDocTOC() {
  const {frontMatter, toc} = useDoc();
  const windowSize = useWindowSize();

  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;

  const mobile = canRender ? <DocItemTOCMobile /> : undefined;

  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return {
    hidden,
    mobile,
    desktop,
  };
}

export default function ApiItemLayout({children}: Props): JSX.Element {
  const docTOC = useDocTOC();
  const {metadata, frontMatter} = useDoc();
  const api = (frontMatter as {api?: unknown}).api;
  const schema = (frontMatter as {schema?: unknown}).schema;

  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocLLMActions />
            <DocItemContent>{children}</DocItemContent>
            <div className="row">
              <div className={clsx('col', api || schema ? 'col--7' : 'col--12')}>
                <DocItemFooter />
              </div>
            </div>
          </article>
          <div className="row">
            <div className={clsx('col', api || schema ? 'col--7' : 'col--12')}>
              <DocItemPaginator />
            </div>
          </div>
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}
