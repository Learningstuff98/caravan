import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CardOption({ card, userCards, root, getCards }) {
  const [addedStatus, setAddedStatus] = useState(false);
  const [userCard, setUserCard] = useState(null);

  useEffect(() => {
    checkForMatch();
  });

  const checkForMatch = () => {
    for(const userCard of userCards) {
      if(card.suit === userCard.suit && card.value === userCard.value) {
        setAddedStatus(true);
        setUserCard(userCard);
        return;
      }
    }
    setAddedStatus(false);
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

  if(addedStatus) {
    return <div className="added-to-deck">
      <span>{card.face}</span>
      <span>{card.value}</span>{" "}
      <span>{card.suit}</span>
      <h1 onClick={() => deleteCard()}>
        delete this card
      </h1>
    </div> 
  } else {
    return <div onClick={() => addCard(card)}>
      <span>{card.face}</span>
      <span>{card.value}</span>{" "}
      <span>{card.suit}</span>
    </div> 
  }
}
