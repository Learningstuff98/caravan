class AddPlayer1CardsPreppedToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :player_1_cards_prepped, :boolean, default: false
  end
end
