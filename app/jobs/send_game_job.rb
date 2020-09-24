class SendGameJob < ApplicationJob
  queue_as :default

  def perform(game)
    ActionCable.server.broadcast("game_channel", game: game)
  end
end
