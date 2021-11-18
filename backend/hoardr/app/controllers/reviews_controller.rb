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
        review = Review.new(review_params)

        review.user_id = set_user
        review.video_game_id = set_video_game

        if review.save
            render json: review, include: [:user, :video_game]
        else
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
        user.id
    end

    def set_video_game
        video_game = VideoGame.find(params[:review][:video_game][:id])
        video_game.id
    end

end
