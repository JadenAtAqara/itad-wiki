import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
// import useDoc
import {useDoc} from '@docusaurus/plugin-content-docs/client'; 
import TagsListInline from '@theme/TagsListInline';
import EditMetaRow from '@theme/EditMetaRow';

// import self component
import ShareButtons from '@site/src/components/ShareButtons'; 

export default function DocItemFooter() {
  // 1. metadata
  // metadata contain the title
  const {metadata} = useDoc(); 
  
  const {editUrl, lastUpdatedAt, lastUpdatedBy, tags, title} = metadata;
  
  // Use metadata.title as share
  const docTitle = title; 
  
  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
  
  // Besure title display 
  const canDisplayShare = !!docTitle;
  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow || canDisplayShare;
  
  if (!canDisplayFooter) {
    return null;
  }

  // 2. Insert ShareButtons
  return (
    <>
      {/* use metadata.title */}
      {canDisplayShare && (
        <div className="row margin-top--md">
          <div className="col">
            <ShareButtons title={docTitle} />
          </div>
        </div>
      )}

      {/* origin <footer /> */}
      <footer
        className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg')}>
        {canDisplayTagsRow && (
          <div
            className={clsx(
              'row margin-top--sm',
              ThemeClassNames.docs.docFooterTagsRow,
            )}>
            <div className="col">
              <TagsListInline tags={tags} />
            </div>
          </div>
        )}
        {canDisplayEditMetaRow && (
          <EditMetaRow
            className={clsx(
              'margin-top--sm',
              ThemeClassNames.docs.docFooterEditMetaRow,
            )}
            editUrl={editUrl}
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </footer>
    </>
  );
}
