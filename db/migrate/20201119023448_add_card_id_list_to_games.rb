class AddCardIdListToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :card_id_list, :text
  end
end
