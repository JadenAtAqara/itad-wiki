import React from 'react';
import { useLocation } from '@docusaurus/router';
import {
  FacebookShareButton,
  TwitterShareButton, // X (Twitter)
  LinkedinShareButton,
  RedditShareButton,
  EmailShareButton, // email
  WhatsappShareButton, // WhatsApp
} from 'react-share';

import {
  FacebookIcon,
  XIcon, // X (Twitter)
  LinkedinIcon,
  RedditIcon,
  EmailIcon,
  WhatsappIcon,
} from 'react-share';

const SITE_DOMAIN = 'https://dev-wiki.aqara.com'; 

function ShareButtons({ title }) {
  const location = useLocation();
  // URL = domain + current_path
  const shareUrl = `${SITE_DOMAIN}${location.pathname}`;

  return (
    
    <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        marginTop: '30px', 
        paddingTop: '20px',
        borderTop: '1px solid var(--ifm-toc-border-color)',
    }}>


      
      {/* 1. X (Twitter) */}
      <TwitterShareButton url={shareUrl} title={title}>
        <XIcon size={32} round />
      </TwitterShareButton>

      {/* 2. Facebook */}
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      {/* 3. LinkedIn */}
      <LinkedinShareButton url={shareUrl} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      {/* 4. Reddit */}
      <RedditShareButton url={shareUrl} title={title}>
        <RedditIcon size={32} round />
      </RedditShareButton>
      
      {/* 5. WhatsApp */}
      <WhatsappShareButton url={shareUrl} title={title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      {/* 6. email */}
      <EmailShareButton url={shareUrl} subject={title}>
        <EmailIcon size={32} round />
      </EmailShareButton>
      
    </div>
  );
}

export default ShareButtons;
