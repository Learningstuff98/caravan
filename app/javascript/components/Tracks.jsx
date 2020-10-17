import React from 'react';
import Track from './Track';

export default function Tracks({ cards, selectedCard, root_url }) {
  const playerTwoTrackNumbers = [1, 2, 3];
  const playerOneTrackNumbers = [4, 5, 6];

  const renderPlayerTwoTracks = () => {
    return playerTwoTrackNumbers.map((playerTwoTrackNumber) => {
      return <span>
        <Track
          trackNumber={playerTwoTrackNumber}
          cards={cards}
          selectedCard={selectedCard}
          root_url={root_url}
        />
      </span>
    });
  };

  const renderPlayerOneTracks = () => {
    return playerOneTrackNumbers.map((playerOneTrackNumber) => {
      return <span>
        <Track
          trackNumber={playerOneTrackNumber}
          cards={cards}
          selectedCard={selectedCard}
          root_url={root_url}
        />
      </span>
    });
  };

  return <div>
    <span className="tracks">
      {renderPlayerTwoTracks()}
    </span>
    <br/>
    <span className="tracks">
      {renderPlayerOneTracks()}
    </span>
  </div>
}
