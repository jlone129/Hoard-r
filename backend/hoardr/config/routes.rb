Rails.application.routes.draw do

  root 'sessions#home'
  
  resources :video_games, :users, :user_video_games, :generations, :systems, :genres, :subgenres, :reviews

  get '/logged_in', to: 'sessions#logged_in?'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/profile', to: 'users#profile'
  get '/user', to: 'user#get_user'

end
