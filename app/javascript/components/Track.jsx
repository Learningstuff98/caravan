import React, { useEffect } from 'react';
import axios from "axios";
import Card from './Card';

function Track(props) {
  const { trackNumber, cards, selectedCard, root_url, setSelectedCard, forPlayerOne, tracks, setTracks, current_user, game, discardCard } = props;

  const moveCard = () => {
    axios.patch(`${root_url}cards/${selectedCard.id}`, {
      stage: `track${trackNumber}`,
      place: getTrackCards().length
    })
    .then(() => setSelectedCard(null))
    .catch((err) => console.log(err.response.data));
  };

  const handleCardMovement = () => {
    if(selectedCard && !selectedCard.face) {
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

  const getKings = (recipientCard) => {
    return getTrackCards().filter((card) =>
      card.face === "King" && recipientCard.id === card.recipient_card_id
    );
  };

  const renderKings = (recipientCard) => {
    return getKings(recipientCard).map((king) => {
      return <span className="king">
        <Card card={king}/>
      </span>
    });
  };

  const setKing = (card) => {
    axios.patch(`${root_url}cards/${selectedCard.id}`, {
      stage: `track${trackNumber}`,
      value: card.value,
      recipient_card_id: card.id
    })
    .then(() => setSelectedCard(null))
    .catch((err) => console.log(err.response.data));
  };

  const setJack = (card) => {
    axios.patch(`${root_url}cards/${selectedCard.id}`, {
      stage: "out"
    })
    .then(() => setJackResult(card))
    .catch((err) => console.log(err.response.data));
  };

  const setJackResult = (baseCard) => {
    setSelectedCard(null);
    for(const card of getTrackCards()) {
      if([card.recipient_card_id, card.id].includes(baseCard.id)) {
        discardCard(card);
      }
    }
  };

  const setFaceCard = (card) => {
    if(selectedCard.face === "King") {
      setKing(card);
    }
    if(selectedCard.face === "Jack") {
      setJack(card);
    }
  };

  const numberCard = (card) => {
    if(!card.face) {
      return <div className={`stack-${handleStackDirection()}`}>
        <span onClick={() => setFaceCard(card)} className="cursor">
          <Card card={card}/>
        </span>
        {renderKings(card)}
      </div>
    }
  };

  const renderCards = () => {
    return <div className="track">
      {getTrackCards().map((card) => {
        return numberCard(card);
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
    return <h3 className="text-center">
      {currentTrack().value}
    </h3>
  };

  const renderEmptyTrack = () => {
    return <div className="empty-track"></div>
  };

  const discardTrack = () => {
    if(confirm("Discard the cards in this track?")) {
      for(const card of getTrackCards()) {
        discardCard(card);
      }
    }
  };

  const handleDiscardTrackButton = () => {
    if(getTrackCards().length > 0) {
      return <h5 onClick={() => discardTrack()} className="box-small text-center cursor">
        Discard Track
      </h5>
    }
  };

  const placeCardButton = () => {
    return <h5 onClick={() => handleCardMovement()} className="box-small text-center cursor">
      Place Card
    </h5>
  };

  const trackButtons = () => {
    return <h5>
      {placeCardButton()}
      {handleDiscardTrackButton()}
    </h5>
  };

  const handleTrackButtons = () => {
    if(forPlayerOne) {
      if(current_user.id === game.user_id) {
        return trackButtons();
      }
    }
    if(!forPlayerOne) {
      if(current_user.id !== game.user_id) {
        return trackButtons();
      }
    }
  };

  const handleTrackDisplay = () => {
    if(getTrackCards().length > 0) {
      if(forPlayerOne) {
        return <div>
          {renderTrackValue()}
          {handleTrackButtons()}
          {renderCards()}
        </div>
      }
      return <div>
        {renderCards()}
        {handleTrackButtons()}
        {renderTrackValue()}
      </div>
    }
    if(forPlayerOne) {
      return <div>
        {renderTrackValue()}
        {handleTrackButtons()}
        {renderEmptyTrack()}
      </div>
    }
    return <div>
      {renderEmptyTrack()}
      {handleTrackButtons()}
      {renderTrackValue()}
    </div>
  };

  return <div>
    {handleTrackDisplay()}
  </div>
}

export default Track;
