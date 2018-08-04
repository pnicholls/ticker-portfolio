class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :transaction_type, null: false, default: 0
      t.date :date, null: false
      t.integer :shares, null: false
      t.float :price, null: false
      t.references :portfolio, null: false, index: true
      t.references :security, null: false, index: true
      t.timestamps
    end

    add_index :transactions, [:portfolio_id, :security_id]
  end
end
