import React from 'react';
import CardBack from './CardBack';

export default function PlayerTwoDeck({ playerTwoDeck }) {
  if(playerTwoDeck.length > 0) {
    return <div>
      <CardBack/>
      <h2>{playerTwoDeck.length}</h2>
    </div>
  }
  return null;
}
