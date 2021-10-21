class VideoGame < ApplicationRecord
    has_many :user_video_games
    has_many :users, through: :user_video_games
    belongs_to :system
    belongs_to :genre
end
