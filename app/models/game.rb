class Game < ApplicationRecord
  belongs_to :user
  has_many :game_tokens
  has_many :cards

  def remove_from_lobby
    self.game_tokens.destroy_all
    SendTokenJob.perform_later(Array(GameToken.all))
  end

end
