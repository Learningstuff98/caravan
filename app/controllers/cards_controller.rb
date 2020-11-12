class CardsController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def create
    card = current_user.cards.create(card_params)
    card.update_attribute(:game_id, 0)
  end

  def destroy
    card = Card.find(params[:id])
    card.destroy
  end

  def update
    card = Card.find(params[:id])
    card.update_attributes(card_params)
    if current_user.hand_card_count < 5
      current_user.draw_card
    end
    SendGameAndCardsJob.perform_later(card.game)
  end

  private

  def card_params
    params.require(:card).permit(:face, :suit, :value, :stage, :place, :recipient_card_id)
  end

end
