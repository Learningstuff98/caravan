import React from 'react';
import CardBack from './CardBack';

export default function PlayerTwoDeck({ cards, belongsToPlayerOne }) {

  const playerTwoDeckCardCount = () => {
    return cards.filter((card) => {
      if(!belongsToPlayerOne(card) && card.stage === 'deck') {
        return card;
      }
    }).length;
  };

  if(playerTwoDeckCardCount() > 0) {
    return <div>
      <CardBack/>
      <h2>{playerTwoDeckCardCount()}</h2>
    </div>
  }
  return null;
}
