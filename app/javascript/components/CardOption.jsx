import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

export default function CardOption({ card, userCards, root_url, getCards }) {
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    collectSelectedCardMatches(userCards);
  }, [userCards]);

  const collectSelectedCardMatches = () => {
    let newSelectedCards = [];
    for(const userCard of userCards) {
      if(card.suit === userCard.suit) {
        if(card.value === userCard.value) {
          newSelectedCards.push(userCard);
        }
        if(card.face === userCard.face) {
          newSelectedCards.push(userCard);
        }
      }
    }
    setSelectedCards(newSelectedCards);
  };

  const addCard = () => {
    axios.post(`${root_url}cards`, card)
    .then(() => getCards())
    .catch((err) => console.log(err.response.data));
  };

  const addCardButton = () => {
    return <div className="cursor" onClick={() => addCard()}>
      Add this card
    </div>
  };

  const deleteCard = () => {
    axios.delete(`${root_url}cards/${selectedCards[selectedCards.length - 1].id}`)
    .then(() => getCards())
    .catch((err) => console.log(err.response.data));
  };

  const handleDeleteCardButton = () => {
    if(selectedCards.length > 0) {
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
    </div>
  };

  const renderCard = () => {
    return <Card card={card}/>
  };

  const handleAddedColoring = () => {
    if(selectedCards.length > 0) {
      return "added-to-deck";
    }
    return "";
  };

  return <h3 className={`card-option-box text-center ${handleAddedColoring()}`}>
    {buildCardOptionBody()}
    {selectedCards.length}
    {addCardButton()}
    {handleDeleteCardButton()}
    <div className="set-deck-card-placement">
      {renderCard()}
    </div>
  </h3>
}
