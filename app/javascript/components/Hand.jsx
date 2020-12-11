import React, { useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import CardBack from './CardBack';

function Hand(props) {

  const { cards, forPlayerOne, game, current_user, determinOwnership, setSelectedCard, selectedCard, isLegalTurn, root_url, gameOver, setPlayerOneHandCardCount, setPlayerTwoHandCardCount } = props;

  useEffect(() => {
    if(forPlayerOne) {
      setPlayerOneHandCardCount(getHandCards().length);
    } else {
      setPlayerTwoHandCardCount(getHandCards().length);
    }
  });

  const getHandCards = () => {
    return cards.filter((card) => {
      if(card.stage === 'hand' && determinOwnership(card, forPlayerOne)) {
        return card;
      }
    });
  };

  const handleSelectedNotice = (card) => {
    if(selectedCard && card.id === selectedCard.id) {
      return <h5 className="box-small text-center">
        Selected
      </h5>
    }
  };

  const discardCard = (card) => {
    axios.patch(`${root_url}cards/${card.id}`, {
      stage: "out"
    })
    .then(() => setSelectedCard(null))
    .catch((err) => console.log(err.response.data));
  };

  const handleDiscard = (card) => {
    if(!gameOver) {
      if(isLegalTurn()) {
        if(confirm("Discard this card?")) {
          discardCard(card);
        }
      } else {
        alert("It's the other player's turn");
      } 
    } else {
      alert("The game is over");
    }
  };

  const discardButton = (card) => {
    return <h5 className="box-small text-center cursor" onClick={() => handleDiscard(card)}>
      Discard
    </h5>
  };

  const handleCardSelecting = (card) => {
    if(!gameOver) {
      if(isLegalTurn()) {
        setSelectedCard(card);
      } else {
        alert("It's the other player's turn");
      }
    } else {
      alert("The game is over");
    }
  };

  const renderHandCard = (card) => {
    return <div key={card.id}>
      <div onClick={() => handleCardSelecting(card)}>
        <Card card={card}/>
        {handleSelectedNotice(card)}
      </div>
      {discardButton(card)}
    </div>
  };

  const displayForPlayerOneHand = (card) => {
    if(game.user_id === current_user.id) {
      return renderHandCard(card);
    }
    return <CardBack/>
  };

  const displayForPlayerTwoHand = (card) => {
    if(game.user_id !== current_user.id) {
      return renderHandCard(card);
    }
    return <CardBack/>
  };

  const showFrontOrBack = (card) => {
    if(forPlayerOne) {
      return displayForPlayerOneHand(card);
    }
    return displayForPlayerTwoHand(card);
  };

  return getHandCards().map((card) => {
    return <span key={card.id} className="hand-card">
      {showFrontOrBack(card)}
    </span>
  });
}

export default Hand;
