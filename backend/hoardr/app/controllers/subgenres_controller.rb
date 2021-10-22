class SubgenresController < ApplicationController

    def index
        @subgenres = Subgenre.all
    end

    def show
        @subgenre = Subgenre.find(params[:id])
    end

end
