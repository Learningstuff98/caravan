import React, { useEffect, useState } from "react";

function WinnerStatement({ tracks, game, setGameOver }) {
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

  const renderWinner = () => {
    if(playerOneSales === 3) {
      setGameOver(true);
      return <h1>{`${game.player_1} won`}</h1>
    }
    if(playerOneSales === 2 && playerTwoSales === 1) {
      setGameOver(true);
      return <h1>{`${game.player_1} won`}</h1>
    }
    if(playerTwoSales === 3) {
      setGameOver(true);
      return <h1>{`${game.player_2} won`}</h1>
    }
    if(playerTwoSales === 2 && playerOneSales === 1) {
      setGameOver(true);
      return <h1>{`${game.player_2} won`}</h1>
    }
  };

  return <div>
    {renderWinner()}
    <h1>{`player 1 sales: ${playerOneSales}`}</h1>
    <h1>{`player 2 sales: ${playerTwoSales}`}</h1>
  </div>
}

export default WinnerStatement;
