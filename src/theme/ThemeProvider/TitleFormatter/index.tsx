import React, { type ComponentProps, type ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { TitleFormatterProvider } from '@docusaurus/theme-common/internal';

type Props = {
  children: ReactNode;
};

type Formatter = ComponentProps<typeof TitleFormatterProvider>['formatter'];

export default function ThemeProviderTitleFormatter({
  children,
}: Props): ReactNode {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  const formatter: Formatter = (params) => {
    const localizedSiteTitle =
      currentLocale === 'zh' ? 'Aqara 文档' : 'Aqara Docs';
    const localizedParams = { ...params, siteTitle: localizedSiteTitle };

    return params.defaultFormatter(localizedParams);
  };

  return (
    <TitleFormatterProvider formatter={formatter}>
      {children}
    </TitleFormatterProvider>
  );
}
