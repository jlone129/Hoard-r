class ApplicationController < ActionController::Base
    before_action :authorized
    
    def secret_key
        "anything"
    end

    def encode(payload)
        JWT.encode(payload, secret_key, 'HS256')
    end

    def decoded_token
        if auth_header()
            token = auth_header.split(" ")[1]
            begin
                JWT.decode(token, "anything", true, algorithm: 'HS256')
            rescue JWT::DecodeError
                nil
            end
    end

    def current_user
        if decoded_token()
            user_id = decoded_token[0]['user_id']
            return @user = User.find(id: user_id)
        else
            nil
        end
    end

    def logged_in?
        !!current_user
    end

    def authorized
        render json: { message: "Please log in" }, status: :unauthorized unless logged_in?
    end

    def logout!
        session.clear
    end

end
