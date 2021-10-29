class UserVideoGamesController < ApplicationController

    skip_before_action :authorized

    def index
        @user_video_games = User_Video_Game.all

        render json: @user_video_games
    end

    def show
        @user_video_game = User_Video_Game.find(params[:id])
    
        render json: @user_video_game
    end

    def new
        @user_video_game = User_Video_Game.new

        render json: @user_video_game
    end

    def create
        @user_video_game = User_Video_Game.create!(user_video_game_params)
        redirect_to @user_video_game
    end

    def edit
        @user_video_game = User_Video_Game.find(params[:id])
    end

    def update
        @user_video_game = User_Video_Game.find(params[:id])
        @user_video_game.update!(user_video_game_params)
        redirect_to @user_video_game
    end

    def destroy
        @user_video_game = User_Video_Game.find(params[:id])
        @user_video_game.destroy
        redirect_to user_path
    end

    private

    def user_video_game_params
        params.require(:user_video_game).permit(:user, :video_game)
    end

end
