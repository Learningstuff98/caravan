Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  get 'lobby', to: 'pages#lobby'
  resources :games, only: [:create, :show, :destroy]
end
