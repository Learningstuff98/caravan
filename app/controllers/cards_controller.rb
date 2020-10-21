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
    current_user.draw_card
    SendGameAndCardsJob.perform_later(card.game)
  end

  private

  def card_params
    params.require(:card).permit(:face, :suit, :value, :stage)
  end

end
