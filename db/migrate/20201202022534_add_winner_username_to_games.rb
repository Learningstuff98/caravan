class AddWinnerUsernameToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :winner_username, :string
  end
end
