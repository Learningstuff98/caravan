class PagesController < ApplicationController
  before_action :authenticate_user!, only: [:lobby]

  def home
    @game = Game.new
  end

  def lobby
    @game_tokens = GameToken.all
  end

end
