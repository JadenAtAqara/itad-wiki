import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import {
  getActiveTabForProductSectionTabs,
  getProductSectionTabsConfig,
} from './config';

export default function ProductSectionTabs() {
  const {pathname} = useLocation();
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const sidebar = useDocsSidebar();

  const config = getProductSectionTabsConfig(pathname);

  if (!config) {
    return null;
  }

  const locale = currentLocale === 'en' ? 'en' : 'zh';
  const activeTab = sidebar
    ? getActiveTabForProductSectionTabs(sidebar.items, pathname) ??
      config.defaultTab
    : config.defaultTab;

  return (
    <div
      className="aqara-doc-layout-tabs"
      role="navigation"
      aria-label={config.ariaLabel[locale]}>
      <div className="aqara-doc-layout-tabs__inner">
        {config.tabs.map((item) => (
          <Link
            key={item.key}
            className={clsx('aqara-doc-layout-tabs__item', {
              'aqara-doc-layout-tabs__item--active': item.key === activeTab,
            })}
            to={item.to}>
            {item.label[locale]}
          </Link>
        ))}
      </div>
    </div>
  );
}
