import React, { useState } from 'react';
import Players from './Players';
import Notice from './Notice';
import WebsocketUpdates from './WebsocketUpdates';

export default function Game({ initialGame, root_url, current_user }) {
  const [game, setGame] = useState(initialGame);
  const [notice, setNotice] = useState(false);

  const handleWebsocketUpdates = () => {
    return <WebsocketUpdates
      game={game}
      current_user={current_user}
      setGame={setGame}
      setNotice={setNotice}
    />
  };

  const renderNotice = () => {
    if(notice) {
      return <Notice
        root_url={root_url}
      />
    }
  };

  return <div>
    {handleWebsocketUpdates()}
    <Players game={game}/>
    {renderNotice()}
  </div>
}
