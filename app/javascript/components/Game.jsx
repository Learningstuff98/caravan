import React, { useEffect, useState } from 'react';
import Players from './Players';
import consumer from "channels/consumer";

export default function Game({ initialGame }) {
  const [game, setGame] = useState(initialGame);

  useEffect(() => {
    handleWebsocketUpdates()
  }, []);

  const handleWebsocketUpdates = () => {
    consumer.subscriptions.create({channel: "GameChannel"}, {
      received(data) {
        if(data.game.id === game.id) {
          setGame(data.game)
        }
      }
    });
  };

  return <div>
    <Players game={game}/>
  </div>
}
