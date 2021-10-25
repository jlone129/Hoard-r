class VideoGame < ApplicationRecord
    has_many :reviews
    has_many :reviewers, through: :reviews, class_name: "User"
    belongs_to :system
    belongs_to :genre
end
