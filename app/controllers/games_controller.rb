class GamesController < ApplicationController
  before_action :authenticate_user!

  def create
    @game = current_user.games.create()
    redirect_to game_path(@game)
  end

  def show
    @game = current_game
  end

  def destroy
    @game = current_game
    @game.destroy
    redirect_to root_path
  end

  private

  def current_game
    @game ||= Game.find(params[:id])
  end

end
