class Genre < ApplicationRecord
    has_many :subgenres
    belongs-to :video_game
end
