class VideoGame < ApplicationRecord
    belongs_to :system
    belongs_to :genre
end
