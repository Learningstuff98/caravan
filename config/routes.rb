Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  resources :games, only: [:create, :show, :destroy]
end
