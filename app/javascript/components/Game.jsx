import React, { useState } from 'react';
import axios from "axios";
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

  const handleNotice = () => {
    if(notice) {
      return <Notice
        root_url={root_url}
      />
    }
  };

  const deleteGame = () => {
    axios.delete(`${root_url}games/${game.id}`)
    .catch((err) => console.log(err.response.data));
  };

  const handleEndGameButton = () => {
    if(!notice) {
      return <h3 className="end-match-btn" onClick={() => deleteGame()}>
        <a className="green" href={root_url}>End Game</a>
      </h3>
    }
  };

  return <div>
    {handleWebsocketUpdates()}
    {handleEndGameButton()}
    {handleNotice()}
    <Players game={game}/>
  </div>
}
