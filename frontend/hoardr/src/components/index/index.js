import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

// const videoGameURL = `http://localhost:3000/video_games/`

class Index extends Component {
    render() {
        const { videoGame } = this.props
        return (
            <div>
                <h1>Video Game Index</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Box Art</th>
                            <th>Title</th>
                            <th>System</th>
                            <th>Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src={videoGame.img_url} alt={videoGame.title}/></td>
                            <td>{videoGame.title}</td>
                            <td>{videoGame.system.name}</td>
                            <td>{videoGame.genre.name}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(Index)