class System < ApplicationRecord
    belongs_to :generation
    has_many :video_games
end
