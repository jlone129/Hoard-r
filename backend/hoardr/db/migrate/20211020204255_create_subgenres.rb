class CreateSubgenres < ActiveRecord::Migration[6.1]
  def change
    create_table :subgenres do |t|
      t.string :name
      t.string :img_url
      t.string :description

      t.timestamps
    end
  end
end
