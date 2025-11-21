import React from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import ShareButtons from '@site/src/components/ShareButtons';

// apply a bottom margin in list view
function useContainerClassName() {
  const {isBlogPostPage} = useBlogPost();
  return !isBlogPostPage ? 'margin-bottom--xl' : undefined;
}

export default function BlogPostItem({children, className}) {
  const {isFullPost, frontMatter, metadata} = useBlogPost(); // 👈 添加 metadata

  const containerClassName = useContainerClassName();
  
  // Get complete URL
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://yourdomain.com${metadata.permalink}`; // SSR 时的备用方案

  return (
    <BlogPostItemContainer className={clsx(containerClassName, className)}>
      {/* Share buttons before blog */}
      <ShareButtons 
        url={currentUrl} 
        title={frontMatter.title || 'Blog Post'} 
      />
      
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      
      {/* Share buttons end blog */}
      <ShareButtons 
        url={currentUrl} 
        title={frontMatter.title || 'Blog Post'} 
      />
      
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
}
