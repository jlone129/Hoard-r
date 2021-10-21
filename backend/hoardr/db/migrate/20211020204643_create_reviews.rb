class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.string :title
      t.string :description
      t.integer :stars
      t.belongs_to :video_game

      t.timestamps
    end
  end
end
