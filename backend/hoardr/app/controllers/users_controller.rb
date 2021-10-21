class UsersController < ApplicationController
    
    def show
        @user = User.find(params[:id])
    end

    def new
        @user = User.new
    end

    def create
        @user = User.new(user_params)

        if @user.save
            session[:user_id] = @user.id
            redirect_to user_path, success: 'Account was successfully created'
        else
            render :new
        end
    end

    def edit
        @user = User.find(params[:id])
    end

    def update
        @user = User.find(params[:id])
        @user.update!(user_params)
        redirect_to user
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
