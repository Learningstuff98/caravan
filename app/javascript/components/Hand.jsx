import React from 'react';
import Card from './Card';
import CardBack from './CardBack';

export default function Hand({ cards, belongsToPlayerOne, forPlayerOne, game, current_user }) {

  const handleSorting = (card) => {
    if(forPlayerOne) {
      return belongsToPlayerOne(card);
    }
    return !belongsToPlayerOne(card);
  };

  const getHandCards = () => {
    return cards.filter((card) => {
      if(handleSorting(card) && card.stage === 'hand') {
        return card;
      }
    });
  };

  const displayForPlayerOneHand = (card) => {
    if(game.user_id === current_user.id) {
      return <Card card={card}/>
    }
    return <CardBack/>
  };

  const displayForPlayerTwoHand = (card) => {
    if(game.user_id !== current_user.id) {
      return <Card card={card}/>
    }
    return <CardBack/>
  };

  const showFrontOrBack = (card) => {
    if(forPlayerOne) {
      return displayForPlayerOneHand(card);
    }
    return displayForPlayerTwoHand(card);
  };

  const handleCards = () => {
    return getHandCards().map((card) => {
      return <span className="hand-card">
        {showFrontOrBack(card)}
      </span>
    });
  };

  return <span>
    {handleCards()}
  </span>
}
