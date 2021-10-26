# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
VideoGame.delete_all
Review.delete_all
System.delete_all
Genre.delete_all
Generation.delete_all
Subgenre.delete_all

users = User.create([
    { username: "TrashyChan", img_url: "https://i1.sndcdn.com/avatars-qoRmQMd3rzqQnesT-gY6fFw-t240x240.jpg", password_digest: "Password1", email: "trash@sum.com", birthdate: 27.years.ago }
])

Generation.create([
    { name: "8th Generation", img_url: "https://cultureofgaming.com/wp-content/uploads/2019/01/switch-xbox-one-ps4.jpg.optimal.jpg", start_date: 13.years.ago, end_date: 1.year.ago }
])

System.create([
 { name: "Playstation 4", img_url: "https://cdn.mos.cms.futurecdn.net/2PKmd7vwWHENGmJusbM49b-1200-80.jpg", brand: "Sony", year: 13.years.ago, description: "4th Playstation from Sony", generation: Generation.first}
])

genres = Genre.create([
    { name: "Dating Sim", img_url: "https://i.insider.com/5d8bd6742e22af48ba108351?width=750&format=jpeg&auto=webp", description: "Love is all you need"}
])

video_games = VideoGame.create!([
    { title: "John Simulator", img_url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6c09a221-be4b-4da8-b2cd-ada0605c5a34/daymh8e-e76c93e2-ccfb-43ec-9d0f-814b1d96b494.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZjMDlhMjIxLWJlNGItNGRhOC1iMmNkLWFkYTA2MDVjNWEzNFwvZGF5bWg4ZS1lNzZjOTNlMi1jY2ZiLTQzZWMtOWQwZi04MTRiMWQ5NmI0OTQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ihFY2erRByN3RIOEqgfYrhhhfa3JSn1nOVqhMNnWqWQ", system: System.first, genre: genres.first }
])
    
reviews = Review.create([
    { title: "Best Game Ever!!!", description: "This game let's you experience what being John is truely like", stars: 5, video_game: video_games.first, user: users.first }
])

Subgenre.create([
    { name: "Horror", img_url: "https://res.cloudinary.com/lmn/image/upload/e_sharpen:100/f_auto,fl_lossy,q_auto/v1/gameskinnyop/b/7/4/orig_b741b794f94e52ccf4f9163d7011bad0.jpg", description: "Scary and freaky", genre: Genre.first }
])