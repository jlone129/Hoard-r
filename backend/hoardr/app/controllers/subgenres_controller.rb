class SubgenresController < ApplicationController

    skip_before_action :authorized

    def index
        @subgenres = Subgenre.all

        render json: @subgenres
    end

    def show
        @subgenre = Subgenre.find(params[:id])

        render json: @subgenre
    end

end
