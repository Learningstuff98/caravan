import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CardOption({ card, userCards, root, getCards }) {
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
    return <div onClick={() => addCard(card)}>
      Add this card
    </div>
  };

  const deleteCardButton = () => {
    return <div onClick={() => deleteCard()}>
      delete this card
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

  return <h3 className={`cursor ${addedStatus}`}>
    {buildCardOptionBody()}
    {handleButtonType()}
  </h3>
}
