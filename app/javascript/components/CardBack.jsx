import React from 'react';

export default function CardBack() {

  const heart = () => {
    return <span className="red">♥</span>
  };

  const diamond = () => {
    return <span className="red">♦</span>
  };

  const spade = () => {
    return <span className="black">♠</span>
  };

  const club = () => {
    return <span className="black">♣</span>
  };

  const topChars = () => {
    return <span>
      <span className="left-char card-back-corner-spacer">
        {heart()}
      </span>
      {spade()}
    </span>
  };

  const bottomChars = () => {
    return <span className="card-back-bottom-chars">
      <span className="left-char card-back-corner-spacer">
        {club()}
      </span>
      {diamond()}
    </span>
  };

  const middleTopChars = () => {
    return <span className="card-back-center text-center">
      {heart()}
      {spade()}
    </span>
  };

  const middleBottomChars = () => {
    return <span className="card-back-center text-center">
      {club()}
      {diamond()}
    </span>
  };

  return <span className="card card-back-corners">
    {topChars()}
    {middleTopChars()}
    {middleBottomChars()}
    {bottomChars()}
  </span>
}
