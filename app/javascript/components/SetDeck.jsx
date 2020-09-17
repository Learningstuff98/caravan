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
    return <h3 className="cursor">
      <CardOption
        card={card}
        userCards={userCards}
        root={getOnlyRoot(setDeckUrl)}
        getCards={getCards}
      />
    </h3>
  };

  const suits = () => {
    return ['diamonds', 'spades', 'hearts', 'clubs'];
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

  return <div>
    {renderNumberCardOptions()}
  </div>
}
