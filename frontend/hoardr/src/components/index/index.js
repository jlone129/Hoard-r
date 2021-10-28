import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

const videoGameURL = `http://localhost:3000/video_games/`

class Index extends Component {

    // componentDidMount() {
    //     fetch(videoGameURL)
    //     .then(res => res.json)
    //     .then()
    // }

    render() {
        return (
            <div>
                <h1>Video Game Index</h1>
            </div>
        )
    }
}

export default withRouter(Index)