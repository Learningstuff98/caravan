class AddHostTurnToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :host_turn, :boolean, default: true
  end
end
