import React from 'react';
import axios from "axios";
import Card from './Card';

export default function Track({ trackNumber, cards, selectedCard, root_url, setSelectedCard, forPlayerOne }) {

  const moveCard = () => {
    axios.patch(`${root_url}cards/${selectedCard.id}`, {
      stage: `track${trackNumber}`
    })
    .then(() => setSelectedCard(null))
    .catch((err) => console.log(err.response.data));
  };

  const handleCardMovement = () => {
    if(selectedCard) {
      moveCard();
    }
  };

  const handleStackDirection = () => {
    if(forPlayerOne) {
      return "downward";
    }
    return "upward";
  };
  
  const renderCards = () => {
    let trackCards = [];
      for(const card of cards) {
        if(card.stage === `track${trackNumber}`) {
          trackCards.push(
            <div className={`stack-${handleStackDirection()}`}>
              <Card card={card}/>
            </div>
          );
        }
      }
    return trackCards;
  };

  return <div onClick={() => handleCardMovement()} className='track text-center'>
    {`track${trackNumber}`}
    {renderCards()}
  </div>
}
