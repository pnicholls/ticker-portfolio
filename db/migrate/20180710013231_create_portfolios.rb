class CreatePortfolios < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolios do |t|
      t.string :name, null: false
      t.boolean :default, null: false, default: false, index: true
      t.references :account, null: false, index: true
      t.timestamps
    end
  end
end
