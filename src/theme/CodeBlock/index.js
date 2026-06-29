import React, {isValidElement} from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {useThemeConfig} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';
import {
  CodeBlockContextProvider,
  createCodeBlockMetadata,
  useCodeWordWrap,
} from '@docusaurus/theme-common/internal';
import Container from '@theme/CodeBlock/Container';
import Title from '@theme/CodeBlock/Title';
import Content from '@theme/CodeBlock/Content';
import BrowserOnly from '@docusaurus/BrowserOnly';
import CopyButton from '@theme/CodeBlock/Buttons/CopyButton';
import WordWrapButton from '@theme/CodeBlock/Buttons/WordWrapButton';
import CodeBlock from '@theme-original/CodeBlock';
import styles from './styles.module.css';

function parseCollapsibleMeta(metastring) {
  const meta = (metastring ?? '').trim();
  if (!meta) {
    return {collapsible: false};
  }

  const hasNoCollapsibleToken = /\b(no-?collapsible|no-?collapse)\b/i.test(meta);
  if (hasNoCollapsibleToken) {
    return {collapsible: false};
  }

  const hasCollapsibleToken = /\b(collapsible|collapse)\b/i.test(meta);
  if (!hasCollapsibleToken) {
    return {collapsible: false};
  }

  const hasCollapsedToken = /\bcollapsed\b/i.test(meta);
  const hasExpandedToken = /\b(expanded|open)\b/i.test(meta);
  // If user opts in to collapsible code blocks, default to collapsed unless
  // explicitly expanded.
  const defaultOpen = hasExpandedToken ? true : hasCollapsedToken ? false : false;

  const summaryMatch =
    meta.match(/\bsummary\s*=\s*"([^"]+)"/i) ??
    meta.match(/\bsummary\s*=\s*'([^']+)'/i);

  const summary = summaryMatch?.[1]?.trim() || '展开代码';

  const previewMatch = meta.match(/\bpreview(Line|Lines)?\s*=\s*(\d+)\b/i);
  const previewLines = previewMatch ? Number(previewMatch[2]) : undefined;

  // Remove our custom directives so Prism/metadata parsing isn't affected.
  const cleanedMetastring = meta
    .replace(/\b(collapsible|collapse|collapsed|expanded|open)\b/gi, '')
    .replace(/\b(no-?collapsible|no-?collapse)\b/gi, '')
    .replace(/\b(noLineNumbers|hideLineNumbers)\b/gi, '')
    .replace(/\bsummary\s*=\s*"[^"]*"/gi, '')
    .replace(/\bsummary\s*=\s*'[^']*'/gi, '')
    .replace(/\bpreview(Line|Lines)?\s*=\s*\d+\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  return {collapsible: true, defaultOpen, summary, previewLines, cleanedMetastring};
}

function maybeStringifyChildren(children) {
  if (React.Children.toArray(children).some((el) => isValidElement(el))) {
    return children;
  }
  return Array.isArray(children) ? children.join('') : children;
}

function ChevronIcon({direction}) {
  const rotation = direction === 'up' ? '180' : '0';
  return (
    <svg
      className={styles.chevron}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{transform: `rotate(${rotation}deg)`}}>
      <path
        fill="currentColor"
        d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"
      />
    </svg>
  );
}

function ExpandCollapseButton({open, totalLines, hiddenLines, onToggle}) {
  const expandTitle =
    totalLines > 0
      ? translate(
          {
            id: 'theme.CodeBlock.expandAllLines',
            message: 'Expand all {totalLines} lines',
            description:
              'Tooltip for the expand-all button of collapsible code blocks.',
          },
          {totalLines},
        )
      : translate({
          id: 'theme.CodeBlock.expandCode',
          message: 'Expand code',
          description:
            'Tooltip for the expand button of collapsible code blocks when total line count is unknown.',
        });
  const collapseTitle =
    hiddenLines > 0
      ? translate(
          {
            id: 'theme.CodeBlock.collapseHiddenLines',
            message: 'Collapse {hiddenLines} lines',
            description:
              'Tooltip for the collapse button of collapsible code blocks.',
          },
          {hiddenLines},
        )
      : translate({
          id: 'theme.CodeBlock.collapseCode',
          message: 'Collapse code',
          description:
            'Tooltip for the collapse button of collapsible code blocks when hidden line count is unknown.',
        });
  return (
    <button
      type="button"
      className={styles.toolbarButton}
      aria-expanded={open}
      onClick={onToggle}
      title={open ? collapseTitle : expandTitle}>
      <ChevronIcon direction={open ? 'up' : 'down'} />
    </button>
  );
}

function FooterToggle({open, totalLines, hiddenLines, onToggle}) {
  const label = open
    ? translate(
        {
          id: 'theme.CodeBlock.collapseHiddenLinesLabel',
          message: 'Collapse {hiddenLines} lines',
          description:
            'Label for the bottom collapse bar of collapsible code blocks.',
        },
        {hiddenLines},
      )
    : translate(
        {
          id: 'theme.CodeBlock.expandAllLinesLabel',
          message: 'Expand all {totalLines} lines',
          description:
            'Label for the bottom expand bar of collapsible code blocks.',
        },
        {totalLines},
      );
  return (
    <button
      type="button"
      className={styles.footerToggle}
      aria-expanded={open}
      onClick={onToggle}>
      <ChevronIcon direction={open ? 'up' : 'down'} />
      <span className={styles.footerText}>{label}</span>
    </button>
  );
}

function useCodeBlockMetadata(props) {
  const {prism} = useThemeConfig();
  return createCodeBlockMetadata({
    code: props.children,
    className: props.className,
    metastring: props.metastring,
    magicComments: prism.magicComments,
    defaultLanguage: prism.defaultLanguage,
    language: props.language,
    title: props.title,
    showLineNumbers: props.showLineNumbers,
  });
}

function CollapsibleCodeBlockString({meta, ...props}) {
  const isBrowser = useIsBrowser();
  const metadata = useCodeBlockMetadata(props);
  const wordWrap = useCodeWordWrap();

  const [open, setOpen] = React.useState(Boolean(meta.defaultOpen));
  const previewLines = meta.previewLines ?? 20;

  const totalLines =
    typeof props.children === 'string' && props.children.length > 0
      ? props.children.split('\n').length
      : metadata.code
        ? metadata.code.split('\n').length
        : 0;
  const hiddenLines = Math.max(0, totalLines - previewLines);
  // In dev/HMR, some MDX transforms can cause us to miscompute line counts.
  // Still render the toggle if collapsible is enabled.
  const showFooter = true;

  return (
    <CodeBlockContextProvider metadata={metadata} wordWrap={wordWrap}>
      <Container
        as="div"
        className={clsx(metadata.className, styles.container)}
        key={String(isBrowser)}>
        {metadata.title && (
          <div className={styles.codeBlockTitle}>
            <Title>{metadata.title}</Title>
          </div>
        )}
        <div className={styles.codeBlockContent}>
          <div className={styles.toolbarWrapper}>
            <div className={styles.toolbar}>
              <BrowserOnly>
                {() => (
                  <>
                    <WordWrapButton />
                    <CopyButton />
                  </>
                )}
              </BrowserOnly>
            </div>
          </div>
          <div
            className={clsx(styles.collapsibleContent, !open && styles.collapsed)}
            style={
              !open
                ? {
                    '--docusaurus-collapsible-code-preview-lines': String(
                      previewLines,
                    ),
                  }
                : undefined
            }>
            <Content />
          </div>
        </div>
        {showFooter && totalLines > 0 && (
          <FooterToggle
            open={open}
            totalLines={totalLines}
            hiddenLines={hiddenLines}
            onToggle={() => setOpen((v) => !v)}
          />
        )}
      </Container>
    </CodeBlockContextProvider>
  );
}

export default function CodeBlockWrapper(props) {
  const children = maybeStringifyChildren(props.children);
  if (typeof children !== 'string') {
    return <CodeBlock {...props} />;
  }

  const metaRaw = (props.metastring ?? '').trim();
  const hasMetaShowLineNumbers = metaRaw.includes('showLineNumbers');
  const hasMetaHideLineNumbers = /\b(noLineNumbers|hideLineNumbers)\b/i.test(
    metaRaw,
  );
  const showLineNumbers =
    typeof props.showLineNumbers !== 'undefined'
      ? props.showLineNumbers
      : hasMetaHideLineNumbers
        ? false
        : hasMetaShowLineNumbers
          ? undefined
          : true;

  const parsedMeta = parseCollapsibleMeta(props.metastring);
  const autoPreviewLines = 20;
  const totalLines = children ? children.split('\n').length : 0;

  const meta =
    parsedMeta.collapsible
      ? parsedMeta
      : totalLines > autoPreviewLines
        ? {
            collapsible: true,
            defaultOpen: false,
            summary: '展开代码',
            previewLines: autoPreviewLines,
            cleanedMetastring: metaRaw.replace(
              /\b(noLineNumbers|hideLineNumbers)\b/gi,
              '',
            ).trim(),
          }
        : {collapsible: false};

  if (!meta.collapsible) {
    return <CodeBlock {...props} showLineNumbers={showLineNumbers} />;
  }

  return (
    <CollapsibleCodeBlockString
      {...props}
      meta={meta}
      metastring={meta.cleanedMetastring}
      showLineNumbers={showLineNumbers}
      children={children}
    />
  );
}
