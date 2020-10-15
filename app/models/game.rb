class Game < ApplicationRecord
  belongs_to :user
  has_many :game_tokens
  has_many :cards

  def remove_from_lobby
    self.game_tokens.destroy_all
    SendTokenJob.perform_later(Array(GameToken.all))
  end

  def handle_player_2(current_user)
    if current_user != self.user && !self.player_2
      self.update_attribute(:player_2, current_user.username)
      self.remove_from_lobby()
    end
  end

end
