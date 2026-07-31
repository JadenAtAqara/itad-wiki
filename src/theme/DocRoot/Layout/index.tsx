import React, {type ReactNode, useState} from 'react';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import type {Props} from '@theme/DocRoot/Layout';
import ProductSectionTabs from '@site/src/components/ProductSectionTabs';
import {useLocation} from '@docusaurus/router';
import {filterSidebarForProductSectionTabs} from '@site/src/components/ProductSectionTabs/config';

import styles from './styles.module.css';

export default function DocRootLayout({children}: Props): ReactNode {
  const sidebar = useDocsSidebar();
  const {pathname} = useLocation();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const sidebarItems = sidebar
    ? filterSidebarForProductSectionTabs(sidebar.items, pathname)
    : undefined;

  return (
    <div className={styles.docsWrapper}>
      <BackToTopButton />
      <ProductSectionTabs />
      <div className={styles.docRoot}>
        {sidebar && sidebarItems && (
          <DocRootLayoutSidebar
            sidebar={sidebarItems}
            hiddenSidebarContainer={hiddenSidebarContainer}
            setHiddenSidebarContainer={setHiddenSidebarContainer}
          />
        )}
        <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
          {children}
        </DocRootLayoutMain>
      </div>
    </div>
  );
}
