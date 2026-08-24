import type {
  PropSidebar,
  PropSidebarItem,
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';

export type ProductTabLocale = 'en' | 'zh';

export type ProductTabDefinition<TTabKey extends string = string> = {
  key: TTabKey;
  label: Record<ProductTabLocale, string>;
  to: string;
};

export type ProductSectionTabsConfig<TTabKey extends string = string> = {
  productKey: string;
  basePath: string;
  defaultTab: TTabKey;
  ariaLabel: Record<ProductTabLocale, string>;
  tabs: ProductTabDefinition<TTabKey>[];
};

type ProductTabKey = string;

function isCategory(item: PropSidebarItem): item is PropSidebarItemCategory {
  return item.type === 'category';
}

function isLink(item: PropSidebarItem): item is PropSidebarItemLink {
  return item.type === 'link';
}

function getExplicitTab(item: PropSidebarItem): ProductTabKey | undefined {
  const customProps =
    'customProps' in item && item.customProps ? item.customProps : undefined;

  return customProps && typeof customProps.tab === 'string'
    ? customProps.tab
    : undefined;
}

export function normalizeDocsPath(pathname: string) {
  return pathname.replace(/^\/[^/]+(?=\/docs\/)/, '');
}

const productSectionTabsConfigs: ProductSectionTabsConfig[] = [
  {
    productKey: 'aqara-studio',
    basePath: '/docs/aqara-studio',
    defaultTab: 'getting-started',
    ariaLabel: {
      en: 'Aqara Studio sections',
      zh: 'Aqara Studio 文档分组',
    },
    tabs: [
      {
        key: 'getting-started',
        label: {
          en: 'Getting Started',
          zh: '快速开始',
        },
        to: '/docs/aqara-studio/overview/introduction',
      },
      {
        key: 'product-knowledge',
        label: {
          en: 'Product Knowledge',
          zh: '产品资料库',
        },
        to: '/docs/aqara-studio/product-knowledge/gateways/studio-hub-comparison',
      },
    ],
  },
];

export function getProductSectionTabsConfig(pathname: string) {
  const normalizedPath = normalizeDocsPath(pathname);

  return productSectionTabsConfigs.find((config) =>
    normalizedPath.startsWith(`${config.basePath}/`),
  );
}

function findTabForPath(
  items: PropSidebar,
  pathname: string,
  inheritedTab?: ProductTabKey,
): ProductTabKey | undefined {
  const normalizedPath = normalizeDocsPath(pathname);

  for (const item of items) {
    const itemTab = getExplicitTab(item) ?? inheritedTab;

    if (isLink(item) && normalizeDocsPath(item.href) === normalizedPath) {
      return itemTab;
    }

    if (isCategory(item)) {
      if (item.href && normalizeDocsPath(item.href) === normalizedPath) {
        return itemTab;
      }

      const childTab = findTabForPath(item.items, pathname, itemTab);
      if (childTab) {
        return childTab;
      }
    }
  }

  return undefined;
}

export function getActiveTabForProductSectionTabs(
  items: PropSidebar,
  pathname: string,
) {
  const config = getProductSectionTabsConfig(pathname);

  if (!config) {
    return undefined;
  }

  return findTabForPath(items, pathname) ?? config.defaultTab;
}

function filterItemForTab(
  item: PropSidebarItem,
  activeTab: ProductTabKey,
  defaultTab: ProductTabKey,
  inheritedTab?: ProductTabKey,
): PropSidebarItem | null {
  const itemTab = getExplicitTab(item) ?? inheritedTab;
  const effectiveTab = itemTab ?? defaultTab;

  if (isLink(item)) {
    return effectiveTab === activeTab ? item : null;
  }

  if (!isCategory(item)) {
    return null;
  }

  const filteredItems = item.items
    .map((child) => filterItemForTab(child, activeTab, defaultTab, itemTab))
    .filter(Boolean) as PropSidebarItem[];

  const hasOwnLink = !!item.href && effectiveTab === activeTab;

  if (filteredItems.length === 0 && !hasOwnLink) {
    return null;
  }

  return {
    ...item,
    items: filteredItems,
  };
}

export function filterSidebarForProductSectionTabs(
  items: PropSidebar,
  pathname: string,
) {
  const config = getProductSectionTabsConfig(pathname);

  if (!config) {
    return items;
  }

  const activeTab = getActiveTabForProductSectionTabs(items, pathname);

  if (!activeTab) {
    return items;
  }

  return items
    .map((item) =>
      filterItemForTab(item, activeTab, config.defaultTab, undefined),
    )
    .filter(Boolean) as PropSidebar;
}
