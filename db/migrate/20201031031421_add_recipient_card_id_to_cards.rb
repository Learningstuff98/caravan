class AddRecipientCardIdToCards < ActiveRecord::Migration[6.0]
  def change
    add_column :cards, :recipient_card_id, :integer
  end
end
