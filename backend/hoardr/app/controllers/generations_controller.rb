class GenerationsController < ApplicationController

    skip_before_action :authorized
    
    def index
        @generations = Generation.all

        render json: @generations
    end

    def show
        @generation = Generation.find(params[:id])

        render json: @generation
    end

end
