import React from 'react';

export default function Card({ card }) {

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

  return <div className={`card ${handleColor()}`}>
    <span className="upper-character">
      {handleValue()}
      {handleFace()}
      {handleSuit()}
    </span>
    <span className="suit">{handleSuit()}</span>
    <span className="lower-character">
      {handleValue()}
      {handleFace()}
      {handleSuit()}
    </span>
  </div>
}
