class CreateSecurities < ActiveRecord::Migration[5.2]
  def change
    create_table :securities do |t|
      t.string :name, null: false, default: ''
      t.string :symbol, null: false, default: '', index: true
      t.integer :identifier, null: false, index: true
      t.timestamps
    end
  end
end
