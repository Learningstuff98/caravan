import React from 'react';
import Track from './Track';

export default function Tracks({ cards, selectedCard, root_url, setSelectedCard, tracks, setTracks }) {

  const renderTracks = (trackNumbers, forPlayerOne) => {
    return trackNumbers.map((trackNumber) => {
      return <span>
        <Track
          trackNumber={trackNumber}
          cards={cards}
          selectedCard={selectedCard}
          root_url={root_url}
          setSelectedCard={setSelectedCard}
          forPlayerOne={forPlayerOne}
          tracks={tracks}
          setTracks={setTracks}
        />
      </span>
    });
  };

  return <div>
    <span className="tracks">
      {renderTracks([1, 2, 3])}
    </span>
    <br/>
    <span className="tracks">
      {renderTracks([4, 5, 6], true)}
    </span>
  </div>
}
