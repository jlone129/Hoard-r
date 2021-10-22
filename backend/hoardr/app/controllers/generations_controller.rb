class GenerationsController < ApplicationController

    def index
        @generations = Generation.all
    end

    def show
        @generation = Generation.find(params[:id])
    end

end
