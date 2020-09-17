class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.integer :user_id
      t.string :suit
      t.string :face
      t.integer :value
    end
    add_index :cards, :user_id
  end
end
