import React, { useEffect, useState } from "react";

function WinnerStatement({ tracks, game, setGameOver, root_url, deleteGame }) {
  const [playerOneSales, setPlayerOneSales] = useState(0);
  const [playerTwoSales, setPlayerTwoSales] = useState(0);

  useEffect(() => {
    getWinStatus();
  }, [tracks]);

  const getWinStatus = () => {
    let playerOneSalesCount = 0;
    let playerTwoSalesCount = 0;
    for(let trackNumber = 1; trackNumber <= 6; trackNumber++) {
      if(tracks[`track${trackNumber}`].status === "Sold") {
        if([4, 5, 6].includes(trackNumber)) {
          playerOneSalesCount += 1;
        } else {
          playerTwoSalesCount += 1;
        }
      }
    }
    setPlayerOneSales(playerOneSalesCount);
    setPlayerTwoSales(playerTwoSalesCount);
  };

  const winnerMessage = (player) => {
    return <h1 className="end-game-message-container">
      <div className="end-game-message-box col-6">
        <br/><br/>
        {`${player} Won`}
        <br/>
        <a href={root_url} onClick={() => deleteGame()} className="green">
          Return to homepage
        </a>
        <br/>
        <a href={`${root_url}lobby`} onClick={() => deleteGame()} className="green">
          Return to Lobby
        </a>
      </div>
    </h1>
  };

  const handleWinnerMessage = () => {
    if(playerOneSales === 3) {
      setGameOver(true);
      return winnerMessage(game.player_1);
    }
    if(playerOneSales === 2 && playerTwoSales === 1) {
      setGameOver(true);
      return winnerMessage(game.player_1);
    }
    if(playerTwoSales === 3) {
      setGameOver(true);
      return winnerMessage(game.player_2);
    }
    if(playerTwoSales === 2 && playerOneSales === 1) {
      setGameOver(true);
      return winnerMessage(game.player_2);
    }
  };

  return <div>
    {handleWinnerMessage()}
    <h1>{`player 1 sales: ${playerOneSales}`}</h1>
    <h1>{`player 2 sales: ${playerTwoSales}`}</h1>
  </div>
}

export default WinnerStatement;
