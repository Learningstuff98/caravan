import React from 'react';

export default function Card({ card, flipChars }) {

  const handleSuit = () => {
    if(card.suit === "Clubs") {
      return <span className="black">♣</span>
    }
    if(card.suit === "Spades") {
      return <span className="black">♠</span>
    }
    if(card.suit === "Diamonds") {
      return <span className="red">♦</span>
    }
    return <span className='red'>♥</span>
  };

  const handleValue = () => {
    if(card.value) {
      if(card.value === 1) {
        return <span>A</span>
      }
      if(card.value === 10) {
        return <span className="ten">10</span> 
      }
      return <span>{card.value}</span>
    }
  };

  const handleColor = () => {
    if(['Hearts', 'Diamonds'].includes(card.suit)) {
      return 'red';
    }
    return 'black';
  };

  const handleFaceChar = () => {
    if(card.face) {
      return <span>{card.face[0]}</span>
    }
  };

  const handleMiddleSymbol = () => {
    if(card.face) {
      if(card.face === "Queen") {
        return <span className="middle-symbol">♛</span>
      }
      if(card.face === "King") {
        return <span className="middle-symbol">♚</span>
      }
    }
    return <span className="middle-symbol">{handleSuit()}</span>
  };

  const handleFlippingChars = () => {
    if(flipChars) {
      return 'flipChars';
    }
  };

  const handleUpperCharacters = () => {
    return <span className="upper-characters">
      <span className="left-character">
        {handleCharacters()}
      </span>
      {handleCharacters()}
    </span>
  };

  const handleLowerCharacters = () => {
    return <span className={`lower-characters ${handleFlippingChars()}`}>
      <span className="left-character">
        {handleCharacters()}
      </span>
      {handleCharacters()}
    </span>
  };

  const handleCharacters = () => {
    return <span>
      {handleValue()}
      {handleFaceChar()}
      {handleSuit()}
    </span>
  };

  return <div className={`card ${handleColor()}`}>
    {handleUpperCharacters()}
    {handleMiddleSymbol()}
    {handleLowerCharacters()}
  </div>
}
