class UserVideoGamesController < ApplicationController

    def index
        @user_video_games = User_Video_Game.all
    end

    def show
        @user_video_game = User_Video_Game.find(params[:id])
    end

    def new
        @user_video_game = User_Video_Game.new
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
