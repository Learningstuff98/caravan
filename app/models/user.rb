class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :games
  has_many :cards
  attr_accessor :login
  validates :username, uniqueness: true, presence: true, length: { minimum: 3 }
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def self.find_for_database_authentication warden_conditions
    conditions = warden_conditions.dup
    login = conditions.delete(:login)
    where(conditions).where(["lower(username) = :value OR lower(email) = :value", {value: login.strip.downcase}]).first
  end

  def set_initial_card_state(cards, game)
    cards.shuffle.each.with_index do |card, i|
      card.update_attribute(:stage, "hand") if i < 5
      card.update_attribute(:stage, "deck") if i >= 5
      card.update_attribute(:game_id, game.id)
    end
  end

  def add_cards_to_game(cards, game)
    game.cards.concat(cards)
  end

  def prepare_cards(cards, game)
    self.set_initial_card_state(cards, game)
    self.add_cards_to_game(cards, game)
  end

  def handle_player_1_card_prep(cards, game)
    if self == game.user && !game.player_1_cards_prepped
      self.prepare_cards(cards, game)
      game.update_attribute(:player_1_cards_prepped, true) 
    end
  end

  def handle_player_2_card_prep(cards, game)
    if self != game.user && !game.player_2_cards_prepped
      self.prepare_cards(cards, game)
      game.update_attribute(:player_2_cards_prepped, true) 
    end
  end

  def handle_card_prep(cards, game)
    self.handle_player_1_card_prep(cards, game)
    self.handle_player_2_card_prep(cards, game)
  end

  def hand_card_count
    self.cards.count { |card| 
      card.stage == 'hand' 
    }
  end

  def draw_card
    self.cards.each do |card|
      if card.stage == 'deck'
        card.update_attribute(:stage, 'hand')
        break
      end
    end
  end

end
