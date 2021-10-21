class CreateUserVideoGames < ActiveRecord::Migration[6.1]
  def change
    create_table :user_video_games do |t|
      t.belongs_to :user
      t.belongs_to :video_game

      t.timestamps
    end
  end
end
