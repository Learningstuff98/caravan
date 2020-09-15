class CreateGameTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :game_tokens do |t|
      t.integer :game_id
      t.string :host_username
    end
    add_index :game_tokens, :game_id
  end
end
