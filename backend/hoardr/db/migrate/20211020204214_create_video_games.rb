class CreateVideoGames < ActiveRecord::Migration[6.1]
  def change
    create_table :video_games do |t|
      t.string :title
      t.string :img_url
      t.string :description
      t.belongs_to :system
      t.belongs_to :genre

      t.timestamps
    end
  end
end
