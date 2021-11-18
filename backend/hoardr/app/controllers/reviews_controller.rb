require 'pry'

class ReviewsController < ApplicationController

    skip_before_action :authorized

    def index
        @reviews = Review.all

        render json: @reviews, include: [:user, :video_game]
    end

    def show
        @review = Review.find(params[:id])

        render json: @review, include: [:user, :video_game]
    end

    def create
        
        set_user
        set_video_game

        if review.save
            # binding.pry
            render json: review, include: [:user, :video_game]
        else
            binding.pry
            render json: { error: "failed to update "}, status: :not_acceptable
        end    

    end

    def update
        @review = Review.find(params[:id])

        if @review.update(review_params)
            render json: @review, include: [:user, :video_game]
        else
            render json: @review.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @review = Review.find(params[:id])
        @review.destroy
        render json: @review
    end

    private

    def review_params
        params.require(:review).permit(:title, :description, :stars)
    end

    def set_user
        user = User.find(params[:review][:user][:id])
        review.user_id = user.id
    end

    def set_video_game
        video_game = VideoGame.find(params[:review][:video_game][:id])
        review.video_game.id = video_game.id
    end

end
