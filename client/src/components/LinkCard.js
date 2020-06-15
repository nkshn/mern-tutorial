import React from 'react';

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link Details</h2>


      <p>
        Original Link:{' '}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Short Link:{' '}
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        Clicks on the Link: <strong>{link.clicks}</strong>
      </p>
      <p>
        Date of Creation:{' '}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};
