# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Review.delete_all
Video_Game.delete_all

users = User.create([
    { username: "TrashyChan", img_url: "https://i1.sndcdn.com/avatars-qoRmQMd3rzqQnesT-gY6fFw-t240x240.jpg", password_digest: "Password1", email: "trash@sum.com", birthdate: 27.years.ago }
])

video_games = Video_Game.create([
    { title: "John Simulator", img_url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6c09a221-be4b-4da8-b2cd-ada0605c5a34/daymh8e-e76c93e2-ccfb-43ec-9d0f-814b1d96b494.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZjMDlhMjIxLWJlNGItNGRhOC1iMmNkLWFkYTA2MDVjNWEzNFwvZGF5bWg4ZS1lNzZjOTNlMi1jY2ZiLTQzZWMtOWQwZi04MTRiMWQ5NmI0OTQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ihFY2erRByN3RIOEqgfYrhhhfa3JSn1nOVqhMNnWqWQ"}
])

reviews = Review.create([
    { title: "Best Game Ever!!!", description: "This game let's you experience what being John is truely like", stars: 5, video_game: video_games.first, user: users.first }
])