import React from 'react';
import axios from "axios";
import Card from './Card';

export default function Track({ trackNumber, cards, selectedCard, root_url }) {

  const moveCard = () => {
    axios.patch(`${root_url}cards/${selectedCard.id}`, {
      stage: `track${trackNumber}`
    })
    .then(() => console.log("no crash"))
    .catch((err) => console.log(err.response.data));
  };

  const handleCardMovement = () => {
    if(selectedCard) {
      moveCard();
    }
  };

  const renderCards = () => {
    let trackCards = [];
      for(const card of cards) {
        if(card.stage === `track${trackNumber}`) {
          trackCards.push(<div><Card card={card}/></div>);
        }
      }
    return trackCards;
  };

  return <div onClick={() => handleCardMovement()} className='track'>
    {`track${trackNumber}`}
    {renderCards()}
  </div>
}
