import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

function CardOption({ card, userCards, root_url, getCards }) {
  const [cardOptionInstances, setCardOptionInstances] = useState([]);

  useEffect(() => {
    collectCardOptionInstances(userCards);
  }, [userCards]);

  const collectCardOptionInstances = () => {
    let newCardOptionInstances = [];
    for(const userCard of userCards) {
      if(card.suit === userCard.suit) {
        if(card.value === userCard.value) {
          newCardOptionInstances.push(userCard);
        }
        if(card.face === userCard.face) {
          newCardOptionInstances.push(userCard);
        }
      }
    }
    setCardOptionInstances(newCardOptionInstances);
  };

  const addCard = () => {
    axios.post(`${root_url}cards`, card)
    .then(() => getCards())
    .catch((err) => console.log(err.response.data));
  };

  const handleAddCardButton = () => {
    if(userCards.length < 50 && cardOptionInstances.length < 3) {
      return <div className="cursor" onClick={() => addCard()}>
        Add this card
      </div>
    }
  };

  const deleteCard = () => {
    axios.delete(`${root_url}cards/${cardOptionInstances[0].id}`)
    .then(() => getCards())
    .catch((err) => console.log(err.response.data));
  };

  const handleDeleteCardButton = () => {
    if(cardOptionInstances.length > 0) {
      return <div className="cursor" onClick={() => deleteCard()}>
        remove
      </div>
    }
  };

  const faceAceOrNumber = () => {
    if(card.face) {
      return <span>{card.face}</span>
    }
    if(card.value === 1) {
      return <span>Ace</span>
    }
    return <span>{card.value}</span>
  };

  const buildCardOptionBody = () => {
    return <div>
      {faceAceOrNumber()}{" of "}
      <span>{card.suit}</span>
      <div>{cardOptionInstances.length}</div>
    </div>
  };

  const renderCard = () => {
    return <Card card={card}/>
  };

  const handleColoring = () => {
    if(cardOptionInstances.length > 0) {
      return "added-to-deck";
    }
    return "";
  };

  return <h3 className={`card-option-box text-center ${handleColoring()}`}>
    {buildCardOptionBody()}
    {handleAddCardButton()}
    {handleDeleteCardButton()}
    <div className="set-deck-card-placement">
      {renderCard()}
    </div>
  </h3>
}

export default CardOption;
