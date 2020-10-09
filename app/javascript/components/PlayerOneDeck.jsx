import React from 'react';
import CardBack from './CardBack';

export default function PlayerOneDeck({ playerOneDeck }) {
  if(playerOneDeck.length > 0) {
    return <div>
      <CardBack/>
      <h2>{playerOneDeck.length}</h2>
    </div>
  }
  return null;
}
