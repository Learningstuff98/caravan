import React from 'react';

export default function Notice({ root_url }) {

  const button = () => {
    return <a href={root_url} className="green">
      Return to homepage
    </a>
  };

  return <div>
    <h1 className="end-game-message-container">
      <div className="end-game-message-box col-6">
        The other player has left.
        <br/>
        {button()}
      </div>
    </h1>
  </div>
}
