class AddPlayer1ToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :player_1, :string
  end
end
