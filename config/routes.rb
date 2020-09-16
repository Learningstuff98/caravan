Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  get 'lobby', to: 'pages#lobby'
  get 'set_deck', to: 'pages#set_deck'
  resources :games, only: [:create, :show, :destroy]
end
