import React from 'react';

export default function Notice({ root_url }) {

  const button = () => {
    return <a href={root_url} className="green">
      Return to homepage
    </a>
  };

  return <h4 className="box player-status">
    <div>The other player has left.</div>
    {button()}
  </h4>
}
