import React from 'react';
import CardBack from './CardBack';

export default function Deck({ cards, forPlayerOne, determinOwnership }) {

  const deckCardCount = () => {
    return cards.filter((card) => {
      if(card.stage === 'deck' && determinOwnership(card, forPlayerOne)) {
        return card;
      }
    }).length;
  };

  if(deckCardCount() > 0) {
    return <div>
      <CardBack/>
      <h2 className="deck-card-count">
        {deckCardCount()}
      </h2>
    </div>
  }

  return <h4>
    This deck is out of cards
  </h4>
}
