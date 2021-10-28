import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

// const videoGameURL = `http://localhost:3000/video_games/`

class Index extends Component {

    render() {
        const { videoGames } = this.props
        return (
            <div>
                <h1>Video Game Index</h1>
                {videoGames.map(videoGame => {
                    <div className="video_game_page">
                        <img src={videoGame.img_url} alt="John the Game"/>
                    </div>
                })}
            </div>
        )
    }
}

export default withRouter(Index)