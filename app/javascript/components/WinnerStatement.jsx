import React, { useEffect, useState } from "react";

function WinnerStatement({ tracks, game }) {
  const [playerOneSales, setPlayerOneSales] = useState(0);
  const [playerTwoSales, setPlayerTwoSales] = useState(0);

  useEffect(() => {
    getWinStatus();
  }, [tracks]);

  const getWinStatus = () => {
    let playerOneSalesTotal = 0;
    let playerTwoSalesTotal = 0;
    for(let trackNumber = 1; trackNumber <= 6; trackNumber++) {
      if(tracks[`track${trackNumber}`].status === "Sold") {
        if([4, 5, 6].includes(trackNumber)) {
          playerOneSalesTotal += 1;
        } else {
          playerTwoSalesTotal += 1;
        }
      }
    }
    setPlayerOneSales(playerOneSalesTotal);
    setPlayerTwoSales(playerTwoSalesTotal);
  };

  const renderWinner = () => {
    if(playerOneSales === 3) {
      return <h1>{`${game.player_1} won`}</h1>
    }
    if(playerOneSales === 2 && playerTwoSales === 1) {
      return <h1>{`${game.player_1} won`}</h1>
    }
    if(playerTwoSales === 3) {
      return <h1>{`${game.player_2} won`}</h1>
    }
    if(playerTwoSales === 2 && playerOneSales === 1) {
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
