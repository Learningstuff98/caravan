# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_31_031421) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.integer "user_id"
    t.string "suit"
    t.string "face"
    t.integer "value"
    t.string "stage", default: "deck"
    t.integer "game_id"
    t.integer "place"
    t.integer "recipient_card_id"
    t.index ["game_id"], name: "index_cards_on_game_id"
    t.index ["user_id"], name: "index_cards_on_user_id"
  end

  create_table "game_tokens", force: :cascade do |t|
    t.integer "game_id"
    t.string "host_username"
    t.index ["game_id"], name: "index_game_tokens_on_game_id"
  end

  create_table "games", force: :cascade do |t|
    t.integer "user_id"
    t.string "player_1"
    t.string "player_2"
    t.integer "absent_player_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "username"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
