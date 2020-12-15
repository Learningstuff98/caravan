class AddPlayer2CardsPreppedToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :player_2_cards_prepped, :boolean, default: false
  end
end
