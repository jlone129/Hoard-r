# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_10_20_213218) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "generations", force: :cascade do |t|
    t.string "name"
    t.string "img_url"
    t.date "start_date"
    t.date "end_date"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "genres", force: :cascade do |t|
    t.string "name"
    t.string "img_url"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.integer "stars"
    t.bigint "video_game_id"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_reviews_on_user_id"
    t.index ["video_game_id"], name: "index_reviews_on_video_game_id"
  end

  create_table "subgenres", force: :cascade do |t|
    t.string "name"
    t.string "img_url"
    t.string "description"
    t.bigint "genre_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["genre_id"], name: "index_subgenres_on_genre_id"
  end

  create_table "systems", force: :cascade do |t|
    t.string "name"
    t.string "img_url"
    t.string "brand"
    t.date "year"
    t.string "description"
    t.bigint "generation_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["generation_id"], name: "index_systems_on_generation_id"
  end

  create_table "user_video_games", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "video_game_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_user_video_games_on_user_id"
    t.index ["video_game_id"], name: "index_user_video_games_on_video_game_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "img_url"
    t.string "password_digest"
    t.string "email"
    t.date "birthdate"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "video_games", force: :cascade do |t|
    t.string "title"
    t.string "img_url"
    t.bigint "system_id"
    t.bigint "genre_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["genre_id"], name: "index_video_games_on_genre_id"
    t.index ["system_id"], name: "index_video_games_on_system_id"
  end

end
