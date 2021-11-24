require 'pry'

class UserVideoGamesController < ApplicationController

    skip_before_action :authorized

    def index
        @user_video_games = UserVideoGame.all

        render json: @user_video_games, include: 
            [:user, 
            :video_game => { include: [:system, :genre] }]
    end

    def show
        @user_video_game = UserVideoGame.find(params[:id])
    
        render json: @user_video_game, include: 
            [:user, 
            :video_game => { include: [:system, :genre] }]
    end

    def create
        @user_video_game = UserVideoGame.create!(user_video_game_params)
        binding.pry
        render json: @user_video_game, include: 
            [:user, 
            :video_game => { include: [:system, :genre] }]
    end

    def destroy
        @user_video_game = UserVideoGame.find(params[:id])
        @user_video_game.destroy
    end

    private

    def user_video_game_params
        params.require(:user_video_game).permit(:user, :video_game)
    end

end
