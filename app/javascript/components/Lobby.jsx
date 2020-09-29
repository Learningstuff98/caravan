import React, { useState, useEffect } from 'react';
import TripleDot from './TripleDot';
import consumer from "channels/consumer";

export default function Lobby({ game_tokens, root_url }) {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    setTokens(game_tokens);
    handleWebsocketUpdates();
  }, []);

  const handleWebsocketUpdates = () => {
    consumer.subscriptions.create({channel: "LobbyChannel"}, {
      received(data) { setTokens(data.tokens) }
    });
  };

  const buildUrl = (token) => {
    return `${root_url}games/${token.game_id}`;
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

  if(tokens.length > 0) {
    return renderGameLinks();
  }

  return <h4>
    <TripleDot message="Waiting for someone to host a match" />
  </h4>
}
