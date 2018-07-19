class CreatePeople < ActiveRecord::Migration[5.2]
  def change
    create_table :people do |t|
      t.string :name, null: false, default: ''
      t.references :account, null: false, index: true
      t.timestamps
    end
  end
end
