import React from 'react';
import axios from "axios";
import Card from './Card';

export default function Track({ trackNumber, cards, selectedCard, root_url, setSelectedCard, forPlayerOne }) {

  const moveCard = () => {
    axios.patch(`${root_url}cards/${selectedCard.id}`, {
      stage: `track${trackNumber}`,
      place: getTrackCards().length
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

  const sortByPlace = (trackCards) => {
    return trackCards.sort((x, y) => {
      return x.place - y.place;
    })
  };

  const getTrackCards = () => {
    let trackCards = [];
      for(const card of cards) {
        if(card.stage === `track${trackNumber}`) {
          trackCards.push(card);
        }
      }
    return sortByPlace(trackCards);
  };

  const renderCards = () => {
    return getTrackCards().map((card) => {
      return <div className={`stack-${handleStackDirection()}`}>
        <Card card={card}/>
      </div>
    });
  };

  const handleTrackDisplay = () => {
    if(getTrackCards().length > 0) {
      return <div className="track">
        {renderCards()}
      </div>
    }
    return <div className="empty-track"></div>
  };

  return <div onClick={() => handleCardMovement()} className="cursor">
    {handleTrackDisplay()}
  </div>
}
