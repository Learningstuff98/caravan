import React, { useState } from 'react';
import axios from "axios";
import Players from './Players';
import Notice from './Notice';
import WebsocketUpdates from './WebsocketUpdates';
import Hand from './Hand';
import Deck from './Deck';
import Tracks from './Tracks';
import WinnerStatement from './WinnerStatement';

export default function Game({ initialGame, root_url, current_user, initialCards }) {
  const [game, setGame] = useState(initialGame);
  const [cards, setCards] = useState(initialCards);
  const [notice, setNotice] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [tracks, setTracks] = useState({
    track1: {
      value: 0,
      direction: "Flat",
      status: "forSale"
    },
    track2: {
      value: 0,
      direction: "Flat",
      status: "forSale"
    },
    track3: {
      value: 0,
      direction: "Flat",
      status: "forSale"
    },
    track4: {
      value: 0,
      direction: "Flat",
      status: "forSale"
    },
    track5: {
      value: 0,
      direction: "Flat",
      status: "forSale"
    },
    track6: {
      value: 0,
      direction: "Flat",
      status: "forSale"
    }
  });

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

  const isLegalTurn = () => {
    if(current_user.id === game.user_id) {
      if(game.host_turn) {
        return true;
      }
    }
    if(current_user.id !== game.user_id) {
      if(!game.host_turn) {
        return true;
      }
    }
  };

  const renderPlayerOneDeck = () => {
    return <div className="deck">
      <Deck
        cards={cards}
        forPlayerOne={true}
        belongsToPlayerOne={belongsToPlayerOne}
        determinOwnership={determinOwnership}
      />
    </div>
  };

  const renderPlayerTwoDeck = () => {
    return <div className="deck">
      <Deck
        cards={cards}
        belongsToPlayerOne={belongsToPlayerOne}
        determinOwnership={determinOwnership}
      />
    </div>
  };

  const renderPlayerOneHand = () => {
    return <div className="hand player-one-hand">
      <Hand
        cards={cards}
        forPlayerOne={true}
        current_user={current_user}
        game={game}
        belongsToPlayerOne={belongsToPlayerOne}
        determinOwnership={determinOwnership}
        setSelectedCard={setSelectedCard}
        selectedCard={selectedCard}
        root_url={root_url}
        isLegalTurn={isLegalTurn}
        gameOver={gameOver}
      />
    </div>
  };

  const renderPlayerTwoHand = () => {
    return <div className="hand player-two-hand">
      <Hand
        cards={cards}
        current_user={current_user}
        game={game}
        belongsToPlayerOne={belongsToPlayerOne}
        determinOwnership={determinOwnership}
        setSelectedCard={setSelectedCard}
        selectedCard={selectedCard}
        root_url={root_url}
        isLegalTurn={isLegalTurn}
        gameOver={gameOver}
      />
    </div>
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

  const renderTracks = () => {
    return <Tracks
      cards={cards}
      selectedCard={selectedCard}
      root_url={root_url}
      setSelectedCard={setSelectedCard}
      tracks={tracks}
      setTracks={setTracks}
      game={game}
      current_user={current_user}
      isLegalTurn={isLegalTurn}
      gameOver={gameOver}
    />
  };

  const winnerStatement = () => {
    return <WinnerStatement
      tracks={tracks}
      game={game}
      setGameOver={setGameOver}
      root_url={root_url}
      deleteGame={deleteGame}
    />
  };

  return <div>
    {handleWebsocketUpdates()}
    {handleEndGameButton()}
    {handleNotice()}
    <Players game={game}/>
    {winnerStatement()}
    {renderPlayerTwoDeck()}
    {renderPlayerTwoHand()}
    {renderTracks()}
    {renderPlayerOneHand()}
    {renderPlayerOneDeck()}
  </div>
}
