import React, { useState } from 'react';
import axios from "axios";
import Players from './Players';
import Notice from './Notice';
import WebsocketUpdates from './WebsocketUpdates';
import Hand from './Hand';
import Deck from './Deck';

export default function Game({ initialGame, root_url, current_user, initialCards }) {
  const [game, setGame] = useState(initialGame);
  const [cards, setCards] = useState(initialCards);
  const [notice, setNotice] = useState(false);

  const handleNotice = () => {
    if(notice) {
      return <Notice root_url={root_url}/>
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

  const belongsToPlayerOne = (card) => {
    return card.user_id === game.user_id;
  };

  const determinOwnership = (card, forPlayerOne) => {
    if(forPlayerOne) {
      return belongsToPlayerOne(card);
    }
    return !belongsToPlayerOne(card);
  };

  const renderPlayerOneDeck = () => {
    return <Deck
      cards={cards}
      forPlayerOne={true}
      belongsToPlayerOne={belongsToPlayerOne}
      determinOwnership={determinOwnership}
    />
  };

  const renderPlayerTwoDeck = () => {
    return <Deck
      cards={cards}
      belongsToPlayerOne={belongsToPlayerOne}
      determinOwnership={determinOwnership}
    />
  };

  const renderPlayerOneHand = () => {
    return <Hand
      cards={cards}
      forPlayerOne={true}
      current_user={current_user}
      game={game}
      belongsToPlayerOne={belongsToPlayerOne}
      determinOwnership={determinOwnership}
    />
  };

  const renderPlayerTwoHand = () => {
    return <Hand
      cards={cards}
      current_user={current_user}
      game={game}
      belongsToPlayerOne={belongsToPlayerOne}
      determinOwnership={determinOwnership}
    />
  };

  const handleWebsocketUpdates = () => {
    return <WebsocketUpdates
      game={game}
      current_user={current_user}
      setGame={setGame}
      setNotice={setNotice}
      setCards={setCards}
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
