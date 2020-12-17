class PagesController < ApplicationController
  before_action :authenticate_user!, only: [:lobby, :set_deck, :player_cards]

  def home
    @game = Game.new
  end

  def lobby
    if current_user.cards.count < 15
      redirect_to root_path
    end
    @game_tokens = GameToken.all
  end

  def set_deck
  end

  def player_cards
    render json: current_user.cards
  end

end
