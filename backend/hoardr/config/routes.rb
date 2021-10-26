Rails.application.routes.draw do

  root 'sessions#home'
  
  resources :video_games, :users, :user_video_games, :generations, :systems, :genres, :subgenres, :reviews

  get '/login', to: 'sessions#login'
  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'
  get '/logout', to: 'sessions#destroy'

end
