class ApplicationController < ActionController::Base
    
    def secret_key
        "anything"
    end

    def encode(payload)
        JWT.encode(payload, secret_key, 'HS256')
    end

    def decode(token)
        JWT.encode(token, "anything", true, {algorithm: 'HS256'})[0]
    end

end
