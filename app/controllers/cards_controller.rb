class CardsController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def create
    current_user.cards.create(card_params)
  end

  def destroy
    card = Card.find(params[:id])
    card.destroy
  end

  private

  def card_params
    params.require(:card).permit(:face, :suit, :value)
  end

end
