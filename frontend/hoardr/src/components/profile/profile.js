import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';

class Profile extends Component {

    constructor() {
        super();

        this.state = {
            review: ""
        }
    }

    render() {
        const { user, reviews, videoGames } = this.props
        return (
            <div className="profile-page">
                {user?
                    <div className="profile">
                        <div className="">
                            {user.img_url?
                                <Image src={user.img_url} alt={user.name} thumbnail />
                            :
                                <Image src="https://static-cdn.jtvnw.net/jtv_user_pictures/5669fc87-38f8-48cd-9a9a-7fc1544b75e8-profile_image-300x300.png" alt="Default Picture" rounded />
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
                            <h1>Video Games</h1>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Box Art</th>
                                        <th>Title</th>
                                        <th>System</th>
                                        <th>Genre</th>
                                    </tr>
                                    <tr>
                                    {videoGames.map(function (videoGame) { 
                                            return ([
                                            <td><Image src={videoGame.img_url} alt={videoGame.title} fluid /></td>,
                                            <td>{videoGame.title}</td>,
                                            <td>{videoGame.system.name}</td>,
                                            <td>{videoGame.genre.name}</td>
                                            ])
                                        })}
                                    </tr>
                                </thead>
                            </Table>
                        </div>
                        <div className="reviews">
                            <h1>Reviews</h1>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Reviewer</th>
                                        <th>Video Game</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Stars</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{user.username}</td>
                                        {reviews.map(function (review) { 
                                            return ([
                                            <td>{review.video_game.title}</td>,
                                            <td>{review.title}</td>,
                                            <td>{review.description}</td>,
                                            <td>{review.stars}</td>
                                            ])
                                        })}
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                : null}
            </div>
        )
    }
}

export default withRouter(Profile)