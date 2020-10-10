import React, { useState } from 'react';
import axios from "axios";
import Players from './Players';
import Notice from './Notice';
import WebsocketUpdates from './WebsocketUpdates';
import PlayerTwoDeck from './PlayerTwoDeck';
import PlayerOneDeck from './PlayerOneDeck';
import PlayerTwoHand from './PlayerTwoHand';
import PlayerOneHand from './PlayerOneHand';

export default function Game({ initialGame, root_url, current_user, initialCards }) {
  const [game, setGame] = useState(initialGame);
  const [cards, setCards] = useState(initialCards);
  const [notice, setNotice] = useState(false);

  const isPlayerOne = () => {
    return current_user.id === game.user_id;
  };

  const belongsToPlayerOne = (card) => {
    return card.user_id === game.user_id;
  };

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

  const renderPlayerOneDeck = () => {
    return <PlayerOneDeck
      cards={cards}
      belongsToPlayerOne={belongsToPlayerOne}
    />
  };

  const renderPlayerTwoDeck = () => {
    return <PlayerTwoDeck
      cards={cards}
      belongsToPlayerOne={belongsToPlayerOne}
    />
  };

  const renderPlayerOneHand = () => {
    return <PlayerOneHand
      isPlayerOne={isPlayerOne}
      cards={cards}
      belongsToPlayerOne={belongsToPlayerOne}
    />
  };

  const renderPlayerTwoHand = () => {
    return <PlayerTwoHand
      isPlayerOne={isPlayerOne}
      cards={cards}
      belongsToPlayerOne={belongsToPlayerOne}
    />
  };

  return <div>
    {handleWebsocketUpdates()}
    {handleEndGameButton()}
    {handleNotice()}
    <Players game={game}/>
    <div className="text-center">
      {renderPlayerTwoDeck()}
      <br/><br/>
      {renderPlayerTwoHand()}
      <br/><br/>
      {renderPlayerOneHand()}
      <br/><br/><br/><br/>
      {renderPlayerOneDeck()}
    </div>
  </div>
}
