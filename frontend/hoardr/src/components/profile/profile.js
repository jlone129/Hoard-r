import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, 
        Image, 
        Container, 
        Card, 
        ListGroup, 
        ListGroupItem,
        Table } from 'react-bootstrap';

class Profile extends Component {

    constructor() {
        super();

        this.state = {
            review: ""
        }
    }


    handleRemoveUser = () => {
        fetch(`http://localhost:3000/users/${this.props.user.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(() => {
            this.props.removeUser(this.props.user)
            alert("User Successfully Deleted")
            this.props.history.push("/")
            this.props.handleLogout()
        })
    }
    
    handleRemoveGame = (userVideoGame) => {

        fetch(`http://localhost:3000/user_video_games/${userVideoGame.id}`,  {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(() => {
            this.props.removeUserGame(userVideoGame)
            alert("Game Successfully Deleted")
        })
    }

    render() {
        
        const { 
            user, 
            reviews, 
            userVideoGames,
            // videoGames,
            // addReview,
            // editReview,
            // removeReview,
            // handleDeleteReview    
        } = this.props

        const {
            handleRemoveGame
        } = this

        return (
            <div className="profile-page">
                {user?
                    <div className="profile">
                        <div className="profile-pic">
                            {user.img_url?
                                <Image src={user.img_url} alt={user.name} thumbnail />
                            :
                                <Image src="https://static-cdn.jtvnw.net/jtv_user_pictures/5669fc87-38f8-48cd-9a9a-7fc1544b75e8-profile_image-300x300.png" alt="Default Picture" thumbnail />
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
                        <div id="deleteThis" >
                            <Button variant="danger" onClick={this.handleRemoveUser}>Delete User</Button>
                        </div>
                        <h1>Owned Games</h1>
                        <Container>
                            {React.Children.toArray(userVideoGames.map((userVideoGame) => (
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={userVideoGame.video_game.img_url} alt={userVideoGame.title} />
                                    <Card.Body>
                                        <Card.Title>{userVideoGame.video_game.title}</Card.Title>
                                        <Card.Text>{userVideoGame.video_game.description}</Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem><b>System:</b> {userVideoGame.video_game.system.name}</ListGroupItem>
                                        <ListGroupItem><b>Genre:</b> {userVideoGame.video_game.genre.name}</ListGroupItem>
                                    </ListGroup>
                                    {/* <Card.Header><b>Reviews</b></Card.Header>
                                        <Review currentUser={user}
                                        reviews={reviews}
                                        addReview={addReview}
                                        editReview={editReview}
                                        removeReview={removeReview}
                                        videoGames={videoGames}
                                        userVideoGame={userVideoGame}
                                        handleDeleteReview={handleDeleteReview}/> */}
                                    <Card.Footer>
                                        <Button onClick={() => handleRemoveGame(userVideoGame)}>Remove Game</Button>
                                    </Card.Footer>
                                </Card>
                            )))}
                        </Container>
                        <h1 id="rev-title">Reviews</h1>
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
                                    {React.Children.toArray(reviews.map((review) => (
                                        review.user.id === user.id &&
                                            reviews.map(function (review) { 
                                                return ([
                                                    <td>{user.username}</td>,
                                                    <td>{review.video_game.title}</td>,
                                                    <td>{review.title}</td>,
                                                    <td>{review.description}</td>,
                                                    <td>{review.stars}</td>
                                                ])
                                            })
                                    )))}
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                : null}
            </div>
        )
    }
}

export default withRouter(Profile)