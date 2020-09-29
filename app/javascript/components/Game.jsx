import React, { useEffect, useState } from 'react';
import Players from './Players';
import consumer from "channels/consumer";
import Notice from './Notice';

export default function Game({ initialGame, root_url, current_user }) {
  const [game, setGame] = useState(initialGame);
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    handleWebsocketUpdates();
  }, []);

  const handleWebsocketUpdates = () => {
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
  };

  const renderNotice = () => {
    if(notice) {
      return <Notice
        root_url={root_url}
      />
    }
  };

  return <div>
    <Players game={game}/>
    {renderNotice()}
  </div>
}
