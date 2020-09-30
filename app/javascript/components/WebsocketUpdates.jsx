import React, { useEffect } from 'react';
import consumer from "channels/consumer";

export default function WebsocketUpdates({ game, current_user, setGame, setNotice }) {

  useEffect(() => {
    consumer.subscriptions.create({channel: "GameChannel"}, {
      received(data) {
        if(data.game.id === game.id) {
          setGame(data.game);
          if(data.game.absent_player_id) {
            if(data.game.absent_player_id !== current_user.id) {
              setNotice(true);
            }
          }
        }
      }
    });
  });

  return null;
}
