class Genre < ApplicationRecord
    has_many :subgenres
    belongs_to :video_game
end
