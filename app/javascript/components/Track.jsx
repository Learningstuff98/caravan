import React, { useEffect } from 'react';
import axios from "axios";
import Card from './Card';

function Track(props) {

  const { trackNumber, cards, selectedCard, root_url, setSelectedCard, forPlayerOne, tracks, setTracks } = props;

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
    return sortByPlace(cards.filter((card) => 
      card.stage === `track${trackNumber}`
    ));
  };

  const renderCards = () => {
    return <div className="track">
      {getTrackCards().map((card) => {
        return <div className={`stack-${handleStackDirection()}`}>
          <Card card={card}/>
        </div>
      })}
    </div>
  };

  const getTrackValue = () => {
    return getTrackCards().reduce((trackValue, card) => {
      return trackValue + card.value;
    }, 0);
  };

  const updateTrack = () => {
    let newTracks = {};
    for(const number of [1, 2, 3, 4, 5, 6]) {
      newTracks[`track${number}`] = {value: tracks[`track${number}`].value};
    }
    newTracks[`track${trackNumber}`].value = getTrackValue();
    return newTracks;
  };

  const currentTrack = () => {
    return tracks[`track${trackNumber}`];
  };

  useEffect(() => {
    if(currentTrack().value !== updateTrack()[`track${trackNumber}`].value) {
      setTracks(updateTrack());
    }
  });

  const renderTrackValue = () => {
    return <h3>{currentTrack().value}</h3>
  };

  const renderEmptyTrack = () => {
    return <div className="empty-track"></div>
  };

  const handleTrackDisplay = () => {
    if(getTrackCards().length > 0) {
      if(forPlayerOne) {
        return <div className="text-center">
          {renderTrackValue()}
          {renderCards()}
        </div>
      }
      return <div className="text-center">
        {renderCards()}
        {renderTrackValue()}
      </div>
    }
    if(forPlayerOne) {
      return <div className="text-center">
        {renderTrackValue()}
        {renderEmptyTrack()}
      </div>
    }
    return <div className="text-center">
      {renderEmptyTrack()}
      {renderTrackValue()}
    </div>
  };

  return <div onClick={() => handleCardMovement()} className="cursor">
    {handleTrackDisplay()}
  </div>
}

export default Track;
