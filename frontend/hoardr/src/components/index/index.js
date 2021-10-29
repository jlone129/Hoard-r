import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

// const videoGameURL = `http://localhost:3000/video_games/`

class Index extends Component {
    render() {
        const { videoGame } = this.props
        return (
            <div>
                <h1>Video Game Index</h1>
                <div className="gameArt">
                    <img src={videoGame.img_url} />
                </div>
                <div className="gameTitle">
                    <h3>{videoGame.title}</h3>
                </div>
                <div className="gameSystem">
                    <h4>Example</h4>
                </div>
                <div className="gameGenre">
                    <h4>Example</h4>
                </div>
            </div>
        )
    }
}

export default withRouter(Index)