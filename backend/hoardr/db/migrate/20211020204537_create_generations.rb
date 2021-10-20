class CreateGenerations < ActiveRecord::Migration[6.1]
  def change
    create_table :generations do |t|
      t.string :name
      t.string :img_url
      t.date :start_date
      t.date :end_date
      t.string :description

      t.timestamps
    end
  end
end
