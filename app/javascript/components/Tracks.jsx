import React from 'react';
import Track from './Track';

export default function Tracks({ cards, selectedCard, root_url, setSelectedCard, tracks, setTracks, current_user, game, isLegalTurn, gameOver }) {

  const renderTracks = (trackNumbers, forPlayerOne) => {
    return trackNumbers.map((trackNumber) => {
      return <span key={trackNumber}>
        <Track
          trackNumber={trackNumber}
          cards={cards}
          selectedCard={selectedCard}
          root_url={root_url}
          setSelectedCard={setSelectedCard}
          forPlayerOne={forPlayerOne}
          tracks={tracks}
          setTracks={setTracks}
          current_user={current_user}
          game={game}
          isLegalTurn={isLegalTurn}
          gameOver={gameOver}
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
