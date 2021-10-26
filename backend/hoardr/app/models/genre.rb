class Genre < ApplicationRecord
    has_many :subgenres
    has_many :video_games
    has_many :user_video_games, through: :video_games
end
