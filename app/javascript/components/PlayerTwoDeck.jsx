import React from 'react';
import CardBack from './CardBack';

export default function PlayerTwoDeck({ cards, belongsToPlayerOne, isDeckCard }) {

  const playerTwoDeckCardCount = () => {
    return cards.filter((card) => {
      if(!belongsToPlayerOne(card) && isDeckCard(card)) {
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
