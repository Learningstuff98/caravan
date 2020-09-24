class GamesController < ApplicationController
  before_action :authenticate_user!

  def create
    @game = current_user.games.create(player_1: current_user.username)
    @game.game_tokens.create(host_username: @game.user.username)
    SendTokenJob.perform_later(Array(GameToken.all))
    redirect_to game_path(@game)
  end

  def show
    @game = current_game
    if current_user != @game.user && !@game.player_2
      @game.update_attribute(:player_2, current_user.username)
      SendGameJob.perform_later(@game)
      @game.remove_from_lobby()
    end
  end

  def destroy
    @game = current_game
    @game.remove_from_lobby()
    @game.destroy
    redirect_to root_path
  end

  private

  def current_game
    @game ||= Game.find(params[:id])
  end

end
