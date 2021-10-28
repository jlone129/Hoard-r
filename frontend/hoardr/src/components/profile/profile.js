import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Profile extends Component {

    constructor() {
        super();

        this.state = {
            review: ""
        }
    }

    render() {
        const { user } = this.props
        return (
            <div className="profile-page">
                {user?
                    <div className="profile">
                        <div className="profile_pic">
                            {user.img_url?
                                <img src={user.img_url}/>
                            :
                                <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/5669fc87-38f8-48cd-9a9a-7fc1544b75e8-profile_image-300x300.png"/>
                            }
                        </div>
                        <div className="username">
                            <h3>{user.username}</h3>
                        </div>
                        <div className="email">
                            <h5>Email: <span>{user.email}</span></h5>
                        </div>
                        <div className="birthdate">
                            <h5>DOB: <span>{user.birthdate}</span></h5>
                        </div>
                        <div className="video_games">
                            <h1>{user.name} Video Games</h1>
                        </div>
                        <div className="reviews">
                            <h1>{user.name} Reviews</h1>
                            <table>
                                <thead>
                                    <th>Reviewer</th>
                                    <th>Video Game</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Stars</th>
                                </thead>
                                <tbody>
                                    <td>{user.username}</td>
                                    <td>Example</td>
                                    <td>Example</td>
                                    <td>Example</td>
                                    <td>Example</td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                : null}
            </div>
        )
    }
}

export default withRouter(Profile)