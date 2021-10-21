class Generation < ApplicationRecord
    has_many :systems
    has_many :video_games, through: :systems
end
