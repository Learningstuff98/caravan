class SendGameAndCardsJob < ApplicationJob
  queue_as :default

  def perform(game)
    ActionCable.server.broadcast("game_channel", game: game, cards: game.cards)
  end
end
