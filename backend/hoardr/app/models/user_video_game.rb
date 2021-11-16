class UserVideoGame < ApplicationRecord
    belongs_to :user
    belongs_to :video_game
    accepts_nested_attributes_for :video_game
end
