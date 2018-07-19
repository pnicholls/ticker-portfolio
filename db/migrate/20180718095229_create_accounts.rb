class CreateAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :accounts do |t|
      t.string :email, null: false, default: '', index: true, unique: true
      t.string :password_digest, null: false, default: ''
      t.timestamps
    end
  end
end
