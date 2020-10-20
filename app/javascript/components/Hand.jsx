import React from 'react';
import Card from './Card';
import CardBack from './CardBack';

export default function Hand({ cards, forPlayerOne, game, current_user, determinOwnership, setSelectedCard, selectedCard }) {

  const getHandCards = () => {
    return cards.filter((card) => {
      if(card.stage === 'hand' && determinOwnership(card, forPlayerOne)) {
        return card;
      }
    });
  };

  const handleSelectedNotice = (card) => {
    if(selectedCard && card.id === selectedCard.id) {
      return <h5 className="selected-notice text-center">
        Selected
      </h5>
    }
  };

  const displayForPlayerOneHand = (card) => {
    if(game.user_id === current_user.id) {
      return <span onClick={() => setSelectedCard(card)}>
        <Card card={card}/>
        {handleSelectedNotice(card)}
      </span>
    }
    return <CardBack/>
  };

  const displayForPlayerTwoHand = (card) => {
    if(game.user_id !== current_user.id) {
      return <span onClick={() => setSelectedCard(card)}>
        <Card card={card}/>
        {handleSelectedNotice(card)}
      </span>
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
    return <span className="hand-card">
      {showFrontOrBack(card)}
    </span>
  });
}
