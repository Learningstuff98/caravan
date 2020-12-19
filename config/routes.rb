Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  get 'lobby', to: 'pages#lobby'
  get 'set_deck', to: 'pages#set_deck'
  get 'player_cards', to: 'pages#player_cards'
  get 'how_to_play', to: 'pages#how_to_play'
  resources :games, only: [:create, :show, :destroy, :update]
  resources :cards, only: [:create, :destroy, :update]
end
