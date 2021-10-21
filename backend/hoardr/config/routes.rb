Rails.application.routes.draw do

  root 'sessions#home'
  
  resources :generations, :systems, :genres, :subgenres, only: [:index, :show]
  # resources :systems, only: [:index, :show]
  # resources :genres, only: [:index, :show]
  # resources :subgenres, only: [:index, :show]
  resources :video_games, :user, :user_video_games

  get '/login', to: 'sessions#login'
  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'
  get '/logout', to: 'sessions#destroy'

end
