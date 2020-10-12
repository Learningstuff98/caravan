import React from 'react';
import CardBack from './CardBack';

export default function PlayerOneDeck({ cards, belongsToPlayerOne, isDeckCard }) {

  const playerOneDeckCardCount = () => {
    return cards.filter((card) => {
      if(belongsToPlayerOne(card) && isDeckCard(card)) {
        return card;
      }
    }).length;
  };

  if(playerOneDeckCardCount() > 0) {
    return <div>
      <CardBack/>
      <h2>{playerOneDeckCardCount()}</h2>
    </div>
  }
  return null;
}
