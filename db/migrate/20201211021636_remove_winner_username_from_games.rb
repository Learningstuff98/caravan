class RemoveWinnerUsernameFromGames < ActiveRecord::Migration[6.0]
  def change
    remove_column :games, :winner_username, :string
  end
end
