class AddStageToCards < ActiveRecord::Migration[6.0]
  def change
    add_column :cards, :stage, :string, default: "deck"
  end
end
