class CreateSystems < ActiveRecord::Migration[6.1]
  def change
    create_table :systems do |t|
      t.string :name
      t.string :img_url
      t.string :brand
      t.date :year
      t.string :description
      t.belongs_to :generation

      t.timestamps
    end
  end
end
