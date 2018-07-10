class CreatePortfolioSecurities < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolio_securities do |t|
      t.references :portfolio, null: false, index: true
      t.references :security, null: false, index: true
      t.timestamps
    end

    add_index :portfolio_securities, %i(portfolio_id security_id), unique: true
  end
end
