import React from 'react';
import CardBack from './CardBack';

export default function Deck({ cards, forPlayerOne, belongsToPlayerOne }) {

  const handleSorting = (card) => {
    if(forPlayerOne) {
      return belongsToPlayerOne(card);
    }
    return !belongsToPlayerOne(card);
  };

  const deckCardCount = () => {
    return cards.filter((card) => {
      if(handleSorting(card) && card.stage === 'deck') {
        return card;
      }
    }).length;
  };

  if(deckCardCount() > 0) {
    return <div>
      <CardBack/>
      <h2>{deckCardCount()}</h2>
    </div>
  }
  return null;
}
