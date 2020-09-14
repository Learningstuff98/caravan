require 'rails_helper'

RSpec.describe GamesController, type: :controller do
  describe "create action" do
    it "should authenticate the user" do
      post :create
      expect(response).to redirect_to new_user_session_path
    end

    it "should let users start games" do
      user = FactoryBot.create(:user)
      sign_in user
      post :create
      expect(response).to have_http_status(:found)
      expect(Game.all.count).to eq 1
    end
  end

  describe "show action" do
    it "should authenticate the user" do
      game = FactoryBot.create(:game)
      get :show, params: { id: game.id }
      expect(response).to redirect_to new_user_session_path
    end

    it "should load the page" do
      user = FactoryBot.create(:user)
      sign_in user
      game = FactoryBot.create(:game)
      get :show, params: { id: game.id }
      expect(response).to have_http_status(:success)
    end
  end

  describe "destroy action" do
    it "should authenticate the user" do
      game = FactoryBot.create(:game)
      delete :destroy, params: { id: game.id }
      expect(response).to redirect_to new_user_session_path
    end

    it "should let players end matches" do
      user = FactoryBot.create(:user)
      sign_in user
      game = FactoryBot.create(:game)
      delete :destroy, params: { id: game.id }
      expect(response).to redirect_to root_path
      expect(Game.all.count).to eq 0
    end
  end
end
