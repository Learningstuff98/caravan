import React from 'react';
import Track from './Track';

export default function Tracks({ cards, selectedCard, root_url, setSelectedCard }) {

  const renderTracks = (trackNumbers) => {
    return trackNumbers.map((trackNumber) => {
      return <span>
        <Track
          trackNumber={trackNumber}
          cards={cards}
          selectedCard={selectedCard}
          root_url={root_url}
          setSelectedCard={setSelectedCard}
        />
      </span>
    });
  };

  return <div>
    <span className="tracks">
      {renderTracks([4, 5, 6])}
    </span>
    <br/>
    <span className="tracks">
      {renderTracks([1, 2, 3])}
    </span>
  </div>
}
