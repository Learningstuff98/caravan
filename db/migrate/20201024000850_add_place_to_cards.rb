class AddPlaceToCards < ActiveRecord::Migration[6.0]
  def change
    add_column :cards, :place, :integer
  end
end
