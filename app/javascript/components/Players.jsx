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

  const displayTurnInfo = () => {
    if(game.host_turn) {
      return <div>It's currently {game.player_1}'s turn</div>
    }
    if(!game.host_turn && !game.player_2) {
      return <div>It's not the host's turn</div>
    }
    return <div>It's currently {game.player_2}'s turn</div>
  };

  return <h3>
    <div>Player 1: {game.player_1}</div>
    {handlePlayer2Message()}
    {displayTurnInfo()}
  </h3>
}
