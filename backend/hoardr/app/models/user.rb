class User < ApplicationRecord
    has_secure_password validations: false

    has_many :user_video_games
    has_many :video_games, through: :user_video_games
    has_many :reviews
    has_many :reviewed_video_games, through: :reviews, class_name: "VideoGame"
    
end
