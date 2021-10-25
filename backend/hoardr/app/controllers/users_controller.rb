class UsersController < ApplicationController

    skip_before_action :authorized, only: [:]

    def index
        @users = User.all

        render json: @users, include: :reviews
    end
    
    def get_user
        @user = self.current_user

        render json: @user, include: :reviews
    end

    def show
        @user = User.find(params[:id])

        render json: @user, include: :reviews
    end

    def create
        @user = User.new(user_params)

        if @user.valid?
            render json: { user: @user }, status: :created
        else
            render json: { error: 'failed to create user' }, status: :not_acceptable
        end
    end

    def update
        @user = User.find(params[:id])
        @user.update!(user_params)
        redirect_to @user
    end

    def destroy
        @user = User.find(params[:id])
        @user.destroy
        redirect_to root_path
    end

    private

    def user_params
        params.require(:user).permit(:username, :password, :img_url, :email, :birthdate)
    end

end
