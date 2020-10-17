Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  get 'lobby', to: 'pages#lobby'
  get 'set_deck', to: 'pages#set_deck'
  get 'player_cards', to: 'pages#player_cards'
  resources :games, only: [:create, :show, :destroy]
  resources :cards, only: [:create, :destroy, :update]
end
