import React, { useEffect, useState } from "react";
import axios from "axios";
import CardOption from './CardOption';

export default function SetDeck({ setDeckUrl, cards }) {
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    setUserCards(cards);
  }, []);

  const getOnlyRoot = (setDeckUrl) => {
    return setDeckUrl.replace('set_deck', '');
  };

  const getCards = () => {
    axios.get(`${getOnlyRoot(setDeckUrl)}player_cards`)
    .then((res) => setUserCards(res.data))
    .catch((err) => console.log(err.response.data));
  };

  const renderCardOption = (card) => { // figure out how to give each element a unique key
    return <CardOption
      card={card}
      userCards={userCards}
      root={getOnlyRoot(setDeckUrl)}
      getCards={getCards}
    />
  };

  const suits = () => {
    return ['Diamonds', 'Spades', 'Hearts', 'Clubs'];
  };

  const faces = () => {
    return ['King', 'Queen', 'Jack'];
  };

  const values = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  };

  const renderNumberCardOptions = () => {
    return suits().map((suit) => {
      return values().map((value) => {
        return renderCardOption({suit: suit, value: value});
      });
    });
  };

  const renderFaceCardOptions = () => {
    return suits().map((suit) => {
      return faces().map((face) => {
        return renderCardOption({suit: suit, face: face});
      });
    });
  };

  return <div>
    {renderNumberCardOptions()}
    {renderFaceCardOptions()}
    <br/>
  </div>
}
