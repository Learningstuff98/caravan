require 'rails_helper'

RSpec.describe CardsController, type: :controller do
  describe "create action" do
    it "should authenticate the user" do
      post :create
      expect(response).to redirect_to new_user_session_path
    end

    it "should let users create cards" do
      user = FactoryBot.create(:user)
      sign_in user
      post :create, params: {
        card: {
          value: 1,
          suit: "Spades",
          face: "King"
        }
      }
      expect(user.cards.count).to eq 1
      expect(Card.first.value).to eq 1
      expect(Card.first.suit).to eq "Spades"
      expect(Card.first.face).to eq "King"
    end
  end

  describe "destroy action" do
    it "should authenticate the user" do
      card = FactoryBot.create(:card)
      delete :destroy, params: { id: card.id }
      expect(response).to redirect_to new_user_session_path
    end

    it "should let users delete cards" do
      card = FactoryBot.create(:card)
      user = FactoryBot.create(:user)
      sign_in user
      delete :destroy, params: { id: card.id }
      expect(Card.all.count).to eq 0
    end
  end
end
