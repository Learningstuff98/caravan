class AddAbsentPlayerIdToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :absent_player_id, :integer
  end
end
