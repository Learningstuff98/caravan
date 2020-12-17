import React, { useEffect, useState } from "react";
import axios from "axios";
import CardOption from './CardOption';

export default function SetDeck({ root_url, cards }) {
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    setUserCards(cards);
  }, []);

  const getCards = () => {
    axios.get(`${root_url}player_cards`)
    .then((res) => setUserCards(res.data))
    .catch((err) => console.log(err.response.data));
  };

  const renderCardOption = (card) => {
    return <CardOption
      card={card}
      userCards={userCards}
      root_url={root_url}
      getCards={getCards}
    />
  };

  const suits = () => {
    return ['Diamonds', 'Spades', 'Hearts', 'Clubs'];
  };

  const faces = () => {
    return ['King', 'Jack'];
  };

  const values = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  };

  const renderNumberCardOptions = () => {
    return suits().map((suit) => {
      return values().map((value) => {
        return <div key={`${suit}${value}`}>
          {renderCardOption({suit: suit, value: value})}
        </div>
      });
    });
  };

  const renderFaceCardOptions = () => {
    return suits().map((suit) => {
      return faces().map((face) => {
        return <div key={`${suit}${face}`}>
          {renderCardOption({suit: suit, face: face})}
        </div>
      });
    });
  };

  const setDeckText = () => {
    return <h3 className="text-center set-deck-width">
      Set your deck
      <br/><br/>
      You can have
      a maximum of 3 of
      each card type
      and a maximum
      of 50 cards total.
      <br/><br/>
      Your current total is <br/>
      {userCards.length}
    </h3>
  };

  return <div>
    {setDeckText()}
    {renderNumberCardOptions()}
    {renderFaceCardOptions()}
    <br/>
  </div>
}
