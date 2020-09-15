class GamesController < ApplicationController
  before_action :authenticate_user!

  def create
    @game = current_user.games.create()
    @game.game_tokens.create(host_username: @game.user.username)
    SendTokenJob.perform_later(Array(GameToken.all))
    redirect_to game_path(@game)
  end

  def show
    @game = current_game
  end

  def destroy
    @game = current_game
    @game.game_tokens.destroy_all
    SendTokenJob.perform_later(Array(GameToken.all))
    @game.destroy
    redirect_to root_path
  end

  private

  def current_game
    @game ||= Game.find(params[:id])
  end

end
