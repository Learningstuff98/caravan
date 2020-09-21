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
      return <span>{card.value}</span>
    }
  };

  const handleColor = () => {
    if(['Hearts', 'Diamonds'].includes(card.suit)) {
      return 'red';
    }
    return 'black';
  };

  const handleFace = () => {
    if(card.face) {
      return <span>{card.face[0]}</span>
    }
  };

  const handleMiddleSymbol = () => {
    if(card.face) {
      if(card.face === "Queen") {
        return <span className="suit">♛</span>
      }
      if(card.face === "King") {
        return <span className="suit">♚</span>
      }
    }
    return <span className="suit">{handleSuit()}</span>
  };

  const handleFlippingChars = () => {
    if(flipChars) {
      return 'flipChars';
    }
  };

  return <div className={`card ${handleColor()}`}>
    <span className="upper-characters">
      <span className="left-character">
        {handleValue()}
        {handleFace()}
        {handleSuit()}
      </span>
      {handleValue()}
      {handleFace()}
      {handleSuit()}
    </span>
    {handleMiddleSymbol()}
    <span className={`lower-characters ${handleFlippingChars()}`}>
      <span className="left-character">
        {handleValue()}
        {handleFace()}
        {handleSuit()}
      </span>
      {handleValue()}
      {handleFace()}
      {handleSuit()}
    </span>
  </div>
}
