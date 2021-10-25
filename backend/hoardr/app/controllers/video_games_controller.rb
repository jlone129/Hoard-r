class VideoGamesController < ApplicationController

    def index
        @video_games = Video_Game.all
        render json: @video_games
    end

    def show
        @video_game = Video_Game.find(params[:id])
        render json: @video_games
    end

end
