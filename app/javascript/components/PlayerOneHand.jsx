import React from 'react';
import Card from './Card';
import CardBack from './CardBack';

export default function PlayerOneHand({ cards, isPlayerOne, belongsToPlayerOne }) {

  const getPlayerOneHandCards = () => {
    return cards.filter((card) => {
      if(belongsToPlayerOne(card) && card.stage === 'hand') {
        return card;
      }
    });
  };

  const showFrontOrBack = (card) => {
    if(isPlayerOne()) {
      return <Card card={card}/>
    }
    return <CardBack/>
  };

  const handleCards = () => {
    return getPlayerOneHandCards().map((card) => {
      return <span className="hand-card">
        {showFrontOrBack(card)}
      </span>
    });
  };

  return <span>
    {handleCards()}
  </span>
}
