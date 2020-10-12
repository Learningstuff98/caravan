class IndexCardsOnGameId < ActiveRecord::Migration[6.0]
  def change
    add_index :cards, :game_id
  end
end
