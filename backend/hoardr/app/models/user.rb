class User < ApplicationRecord
    has_many :user_video_games
    has_many :video_games, through: :user_video_games
    has_many :reviews, through: :user_video_games
end
