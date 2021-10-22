class VideoGamesController < ApplicationController

    def index
        @video_games = Video_Game.all
    end

    def show
        @video_game = Video_Game.find(params[:id])
    end

end
