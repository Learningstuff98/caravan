class SendTokenJob < ApplicationJob
  queue_as :default

  def perform(tokens)
    ActionCable.server.broadcast("lobby_channel", tokens: tokens)
  end

end
