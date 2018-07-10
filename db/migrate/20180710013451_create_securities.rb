class CreateSecurities < ActiveRecord::Migration[5.2]
  def change
    create_table :securities do |t|
      t.string :name, null: false
      t.string :symbol, null: false
      t.timestamps
    end
  end
end
