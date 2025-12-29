import React from 'react';

const Footer = () => {
  const y = new Date().getFullYear();
  return (<footer>© <span>{y}</span> Sally Hill used chat gpt 5. All rights reserved.</footer>);
};

export default Footer;