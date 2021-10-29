class GenerationsController < ApplicationController

    skip_before_action :authorized
    
    def index
        @generations = Generation.all
    end

    def show
        @generation = Generation.find(params[:id])
    end

end
