import React from 'react';
import Card from './Card';
import CardBack from './CardBack';

export default function PlayerTwoHand({ playerTwoHand, isPlayerOne }) {

  const showOrHideCard = (card) => {
    if(!isPlayerOne()) {
      return <span key={`${card.value}${card.suit}`}>
        <Card card={card} />
      </span>
    }
    return <CardBack/>
  };

  return playerTwoHand.map((card) => {
    return <span className="hand-card">
      {showOrHideCard(card)}
    </span>
  });
}
