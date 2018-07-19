# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_07_19_225250) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "password_digest", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_accounts_on_email"
  end

  create_table "people", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.bigint "account_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_people_on_account_id"
  end

  create_table "portfolio_securities", force: :cascade do |t|
    t.bigint "portfolio_id", null: false
    t.bigint "security_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["portfolio_id", "security_id"], name: "index_portfolio_securities_on_portfolio_id_and_security_id", unique: true
    t.index ["portfolio_id"], name: "index_portfolio_securities_on_portfolio_id"
    t.index ["security_id"], name: "index_portfolio_securities_on_security_id"
  end

  create_table "portfolios", force: :cascade do |t|
    t.string "name", null: false
    t.boolean "default", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["default"], name: "index_portfolios_on_default"
  end

  create_table "securities", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "symbol", default: "", null: false
    t.integer "identifier", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["identifier"], name: "index_securities_on_identifier"
    t.index ["symbol"], name: "index_securities_on_symbol"
  end

end
