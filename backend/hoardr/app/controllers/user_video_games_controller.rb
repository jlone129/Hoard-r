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
        user_video_game = UserVideoGame.new(user_video_game_params)
        
        user_video_game.user_id = set_user
        user_video_game.video_game_id = set_video_game   
        
        if user_video_game.save
            render json: @user_video_game, include: 
                [:user, 
                :video_game => { include: [ :system, :genre] }]
        else
            render json: { error: "failed to update "}, status: :not_acceptable
        end     
    end
    
    def destroy
        @user_video_game = UserVideoGame.find(params[:id])
        @user_video_game.destroy
        render json: @user_video_game, include: 
                [:user, 
                :video_game => { include: [ :system, :genre] }]
    end
        
    private 
    
    def user_video_game_params
        params.require(:user_video_game).permit(:user, :video_game)
    end

    def set_user
        user = User.find(params[:user_video_game][:user][:id])
        user.id
    end
    
    def set_video_game
        video_game = VideoGame.find(params[:user_video_game][:videoGame][:id])
        video_game.id
    end

end
