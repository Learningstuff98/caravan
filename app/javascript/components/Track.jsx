import React, { useEffect } from 'react';
import axios from "axios";
import Card from './Card';

function Track(props) {
  const { trackNumber, cards, selectedCard, root_url, setSelectedCard, forPlayerOne, tracks, setTracks, current_user, game, isLegalTurn } = props;

  const moveCard = () => {
    axios.patch(`${root_url}cards/${selectedCard.id}`, {
      stage: `track${trackNumber}`,
      place: getTrackCards().length
    })
    .then(() => setSelectedCard(null))
    .catch((err) => console.log(err.response.data));
  };

  const getValueCards = () => {
    return cards.filter((card) => {
      return card.stage === `track${trackNumber}` && !card.face
    });
  };

  const handleUpwardCardMoves = (selectedCard, lastValueCard) => {
    if(currentTrack().direction === 'Up') {
      if(selectedCard.value > lastValueCard.value) {
        moveCard();
      } else {
        alert("This track's direction is going upward. You'll need a card that has a higher value, or a card of the same suit as the last card in this track");
      }
    }
  };

  const handleDownwardCardMoves = (selectedCard, lastValueCard) => {
    if(currentTrack().direction === 'Down') {
      if(selectedCard.value < lastValueCard.value) {
        moveCard();
      } else {
        alert("This track's direction is going downward. You'll need a card that has a lower value, or a card of the same suit as the last card in this track");
      }
    }
  };

  const handleCardMovement = () => {
    const valueCards = sortByPlace(getValueCards());
    const lastValueCard = valueCards[valueCards.length - 1];
    if(selectedCard && !selectedCard.face) {
      if(currentTrack().direction !== "Flat") {
        if(selectedCard.suit !== lastValueCard.suit) {
          handleUpwardCardMoves(selectedCard, lastValueCard);
          handleDownwardCardMoves(selectedCard, lastValueCard);
        } else {
          moveCard();
        }
      } else {
        moveCard();
      }
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

  const setJack = (baseCard) => {
    let cardIdsForDiscard = [];
    for(const card of getTrackCards()) {
      if([card.recipient_card_id, card.id].includes(baseCard.id)) {
        cardIdsForDiscard.push(card.id);
      }
    }
    cardIdsForDiscard.push(selectedCard.id);
    updateCardIdList(cardIdsForDiscard);
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

  const getDirection = () => {
    const valueCards = sortByPlace(getValueCards());
    const lastCard = valueCards[valueCards.length - 1];
    const secondToLastCard = valueCards[valueCards.length - 2];
    if(valueCards.length > 1) {
      if(lastCard.value > secondToLastCard.value) {
        return "Up";
      }
      if(lastCard.value < secondToLastCard.value) {
        return "Down";
      }
    }
    return "Flat";
  };

  const updateTrack = () => {
    let newTracks = {};
    for(const number of [1, 2, 3, 4, 5, 6]) {
      newTracks[`track${number}`] = {
        value: tracks[`track${number}`].value,
        direction: tracks[`track${number}`].direction
      };
    }
    newTracks[`track${trackNumber}`].value = getTrackValue();
    newTracks[`track${trackNumber}`].direction = getDirection();
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

  const getTrackCardIds = () => {
    return getTrackCards().map((card) => {
      return card.id;
    });
  };

  const handleTrackDiscard = () => {
    if(isLegalTurn()) {
      if(confirm("Discard the cards in this track?")) {
        updateCardIdList(getTrackCardIds());
      }
    } else {
      alert("It's the other player's turn");
    }
  };

  const updateCardIdList = (ids) => {
    axios.patch(`${root_url}games/${game.id}`, {
      card_id_list: `${ids}`
    })
    .then(() => setSelectedCard(null))
    .catch((err) => console.log(err.response.data));
  };

  const handleDiscardTrackButton = () => {
    if(getTrackCards().length > 0) {
      return <div onClick={() => handleTrackDiscard()} className="box-small text-center cursor">
        Discard Track
      </div>
    }
  };

  const placeCardButton = () => {
    return <div onClick={() => handleCardMovement()} className="box-small text-center cursor">
      Place Card
    </div>
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

  const renderTrackDirection = () => {
    return <h5 className="box-small text-center">
      {currentTrack().direction}
    </h5>
  };

  const handleTrackDisplay = () => {
    if(getTrackCards().length > 0) {
      if(forPlayerOne) {
        return <div>
          {renderTrackValue()}
          {renderTrackDirection()}
          {handleTrackButtons()}
          {renderCards()}
        </div>
      }
      return <div>
        {renderCards()}
        {handleTrackButtons()}
        {renderTrackDirection()}
        {renderTrackValue()}
      </div>
    }
    if(forPlayerOne) {
      return <div>
        {renderTrackValue()}
        {renderTrackDirection()}
        {handleTrackButtons()}
        {renderEmptyTrack()}
      </div>
    }
    return <div>
      {renderEmptyTrack()}
      {handleTrackButtons()}
      {renderTrackDirection()}
      {renderTrackValue()}
    </div>
  };

  return <div>
    {handleTrackDisplay()}
  </div>
}

export default Track;
