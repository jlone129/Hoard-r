class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :img_url, :password_digest, :email, :birthdate
end
