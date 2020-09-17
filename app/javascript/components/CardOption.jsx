import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CardOption({ card, userCards, root, getCards }) {
  const [addedStatus, setAddedStatus] = useState("");
  const [userCard, setUserCard] = useState(null);

  useEffect(() => {
    checkForMatch();
  });

  const checkForMatch = () => {
    for(const userCard of userCards) {
      if(card.suit === userCard.suit && card.value === userCard.value) {
        setAddedStatus("added-to-deck");
        setUserCard(userCard);
      }
    }
  };

  const addCard = (card) => {
    axios.post(`${root}cards`, card)
    .then(() => getCards())
    .catch((err) => console.log(err.response.data));
  };

  const renderAddedStatus = () => {
    return <div onClick={() => addCard(card)}>
      Click to add this card
    </div>
  };

  return <div className={addedStatus}>
    {renderAddedStatus()}
    <span>{card.face}</span>
    <span>{card.value}</span>{" "}
    <span>{card.suit}</span>
  </div>  
}
