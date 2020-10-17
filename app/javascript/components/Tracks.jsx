import React from 'react';
import Track from './Track';

export default function Tracks({ cards, selectedCard, root_url }) {
  const trackNumbers = [1, 2, 3, 4, 5, 6];

  const handleNewLine = (trackNumber) => {
    if(trackNumber === 3) {
      return <br/>
    }
  };

  return trackNumbers.map((trackNumber) => {
    return <span>
      <Track
        trackNumber={trackNumber}
        cards={cards}
        selectedCard={selectedCard}
        root_url={root_url}
      />
      {handleNewLine(trackNumber)}
    </span>
  });
}
