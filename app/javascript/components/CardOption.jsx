import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

export default function CardOption({ card, userCards, root, getCards, flipChars }) {
  const [addedStatus, setAddedStatus] = useState("");
  const [userCard, setUserCard] = useState(null);

  useEffect(() => {
    checkForMatch();
  });

  const checkForMatch = () => {
    for(const userCard of userCards) {
      if(card.suit === userCard.suit) {
        if(card.value === userCard.value) {
          handleMatch(userCard);
          return;
        }
        if(card.face === userCard.face) {
          handleMatch(userCard);
          return;
        }
      }
    }
    setAddedStatus("");
  };

  const handleMatch = (userCard) => {
    setAddedStatus("added-to-deck");
    setUserCard(userCard);
  };

  const addCard = (card) => {
    axios.post(`${root}cards`, card)
    .then(() => getCards())
    .catch((err) => console.log(err.response.data));
  };

  const deleteCard = () => {
    axios.delete(`${root}cards/${userCard.id}`)
    .then(() => getCards())
    .catch((err) => console.log(err.response.data));
  };

  const addCardButton = () => {
    return <div className="cursor" onClick={() => addCard(card)}>
      Add this card
    </div>
  };

  const deleteCardButton = () => {
    return <div className='cursor' onClick={() => deleteCard()}>
      Remove this card
    </div>
  };

  const handleButtonType = () => {
    if(addedStatus) {
      return deleteCardButton();
    }
    return addCardButton();
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
    </div>
  };

  const renderCard = () => {
    return < Card
      card={card}
      flipChars={flipChars}
    />
  };

  return <h3 className={`card-option-box text-center ${addedStatus}`}>
    {buildCardOptionBody()}
    {handleButtonType()}
    <div className="set-deck-card-placement">
      {renderCard()}
    </div>
  </h3>
}
