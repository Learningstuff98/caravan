class GamesController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token, only: [:destroy]

  def create
    @game = current_user.games.create(player_1: current_user.username)
    @game.game_tokens.create(host_username: @game.user.username)
    SendTokenJob.perform_later(Array(GameToken.all))
    redirect_to game_path(@game)
  end

  def show
    @game = current_game
    current_user.prepare_cards(current_user.cards, @game)
    @game.handle_player_2(current_user)
    SendGameAndCardsJob.perform_later(@game)
  end

  def destroy
    @game = current_game
    @game.update_attribute(:absent_player_id, current_user.id)
    SendGameJob.perform_later(@game)
    @game.remove_from_lobby()
    @game.destroy
  end

  private

  def current_game
    @game ||= Game.find(params[:id])
  end

end
