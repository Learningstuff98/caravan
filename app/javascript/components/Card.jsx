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

  return <div className={`card ${handleColor()}`}>
    <span className="upper-number">
      {handleValue()}
    </span>
    <span className="lower-number">
      {handleValue()}
    </span>
  </div>
}
