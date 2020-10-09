import React, { useState, useEffect } from 'react';
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
  const [playerOneDeck, setPlayerOneDeck] = useState([]);
  const [playerTwoDeck, setPlayerTwoDeck] = useState([]);
  const [playerOneHand, setPlayerOneHand] = useState([]);
  const [playerTwoHand, setPlayerTwoHand] = useState([]);
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    sortCards();
  }, []);

  const isPlayerOne = () => {
    return current_user.id === game.user_id;
  };

  const belongsToPlayerOne = (card) => {
    return card.user_id === game.user_id;
  };

  const addCardToPlayerOneHand = (card) => {
    setPlayerOneHand((prevPlayerOneHand) => {
      return [card, ...prevPlayerOneHand];
    });
  };

  const addCardToPlayerTwoHand = (card) => {
    setPlayerTwoHand((prevPlayerTwoHand) => {
      return [card, ...prevPlayerTwoHand];
    });
  };

  const sendCardToHand = (card) => {
    if(belongsToPlayerOne(card)) {
      addCardToPlayerOneHand(card);
    } else {
      addCardToPlayerTwoHand(card);
    }
  };

  const addCardToPlayerOneDeck = (card) => {
    setPlayerOneDeck((prevPlayerOneDeck) => {
      return [card, ...prevPlayerOneDeck];
    });
  };

  const addCardToPlayerTwoDeck = (card) => {
    setPlayerTwoDeck((prevPlayerTwoDeck) => {
      return [card, ...prevPlayerTwoDeck];
    });
  };

  const sendCardToDeck = (card) => {
    if(belongsToPlayerOne(card)) {
      addCardToPlayerOneDeck(card);
    } else {
      addCardToPlayerTwoDeck(card);
    }
  };

  const sortCards = () => {
    for(const card of cards) {
      if(card.stage === 'deck') {
        sendCardToDeck(card);
      }
      if(card.stage === 'hand') {
        sendCardToHand(card);
      }
    }
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
      playerOneDeck={playerOneDeck}
    />
  };

  const renderPlayerTwoDeck = () => {
    return <PlayerTwoDeck
      playerTwoDeck={playerTwoDeck}
    />
  };

  const renderPlayerOneHand = () => {
    return <PlayerOneHand
      isPlayerOne={isPlayerOne}
      playerOneHand={playerOneHand}
    />
  };

  const renderPlayerTwoHand = () => {
    return <PlayerTwoHand
      isPlayerOne={isPlayerOne}
      playerTwoHand={playerTwoHand}
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
