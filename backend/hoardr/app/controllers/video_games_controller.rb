class VideoGamesController < ApplicationController

    skip_before_action :authorized

    def index
        @video_games = VideoGame.all

        render json: @video_games
    end

    def show
        @video_game = VideoGame.find(params[:id])
        
        render json: @video_game
    end

end
