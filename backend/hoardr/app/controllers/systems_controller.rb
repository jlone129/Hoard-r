class SystemsController < ApplicationController

    skip_before_action :authorized

    def index
        @systems = System.all

        render json: @systems, include: :generation
    end

    def show
        @system = System.find(params[:id])

        render json: @system, include: :generation
    end

end
