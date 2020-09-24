import React from 'react';
import TripleDot from './TripleDot';

export default function Players({ game }) {

  const handlePlayer2Message = () => {
    if(game.player_2) {
      return `Player 2: ${game.player_2}`
    }
    return <TripleDot
      message="Waiting for someone to join"
    />
  };

  return <h3>
    <div>Player 1: {game.player_1}</div>
    {handlePlayer2Message()}
  </h3>
}
