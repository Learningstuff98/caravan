FactoryBot.define do

  factory :user do
    sequence :email do |n|
      "dummyEmail#{n}@gmail.com"
    end
    sequence :username do |n|
      "dummy_user_name#{n}"
    end
    password { "secretPassword" }
    password_confirmation { "secretPassword" }
  end

  factory :game do
    association :user
  end

  factory :card do
    value { 1 }
    suit { "Spades" }
    face { "King" }
    association :user
  end

end
