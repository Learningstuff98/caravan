import React, { useState, useEffect } from 'react';
import TripleDot from './TripleDot';

export default function Lobby({ game_tokens, lobbyUrl }) {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    setTokens(game_tokens);
  }, []);

  const getOnlyRoot = (lobbyUrl) => {
    return lobbyUrl.replace('lobby', '');
  };

  const buildUrl = (token) => {
    return `${getOnlyRoot(lobbyUrl)}games/${token.game_id}`;
  };

  const buildLink = (token) => {
    return <a className="green" href={buildUrl(token)}>
      {`Hosted by ${token.host_username}`}
    </a>
  };

  const renderGameLinks = () => {
    return tokens.map((token) => {
      return <h4 key={token.id}>
        {buildLink(token)}
      </h4>
    });
  };

  const handleTripleDot = () => {
    return <TripleDot
      message="Waiting for someone to host a match"
    />
  };

  if(tokens.length > 0) {
    return <div>
      {renderGameLinks()}
    </div>
  }

  return <h4>
    {handleTripleDot()}
  </h4>
}
