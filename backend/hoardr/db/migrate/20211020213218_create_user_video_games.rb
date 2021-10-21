class CreateUserVideoGames < ActiveRecord::Migration[6.1]
  def change
    create_table :user_video_games do |t|
      t.string :title
      t.string :img_url

      t.timestamps
    end
  end
end
