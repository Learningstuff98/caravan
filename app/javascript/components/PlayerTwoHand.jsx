import React from 'react';
import Card from './Card';
import CardBack from './CardBack';

export default function PlayerTwoHand({ cards, isPlayerOne, belongsToPlayerOne, isHandCard }) {

  const getPlayerTwoHandCards = () => {
    return cards.filter((card) => {
      if(!belongsToPlayerOne(card) && isHandCard(card)) {
        return card;
      }
    });
  };

  const showFrontOrBack = (card) => {
    if(!isPlayerOne()) {
      return <Card card={card}/>
    }
    return <CardBack/>
  };

  const handleCards = () => {
    return getPlayerTwoHandCards().map((card) => {
      return <span className="hand-card">
        {showFrontOrBack(card)}
      </span>
    });
  };

  return <span>
    {handleCards()}
  </span>
}
