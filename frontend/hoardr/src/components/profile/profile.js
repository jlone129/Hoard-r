import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, 
        Container, 
        Card, 
        Col,
        ListGroup, 
        ListGroupItem,
        Row,
        Table} from 'react-bootstrap';

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
            userVideoGames   
        } = this.props

        const {
            handleRemoveGame
        } = this

        return (
            <div>
                {user?
                    <Container>
                        <Row>
                            <Col><h1 id="profile-title">{user.username} Profile</h1></Col>
                        </Row>
                        <Row>
                            <Col />
                            <Col>
                                <Card style={{display: 'flex', flexDirection: 'row', flex: 1}}>
                                    {user.img_url?
                                        <Card.Img src={user.img_url} alt={user.name} id="profile-pic" />
                                        :
                                        <Card.Img src="https://static-cdn.jtvnw.net/jtv_user_pictures/5669fc87-38f8-48cd-9a9a-7fc1544b75e8-profile_image-300x300.png" alt="Default Picture" thumbnail />
                                    }
                                    <Card.Body id="profile-body">
                                        <Card.Title>{user.username}</Card.Title>
                                        <ListGroup className="list-group-flush">
                                            <ListGroupItem><b>Email:</b> <span>{user.email}</span></ListGroupItem>
                                            <ListGroupItem><b>DOB:</b> <span>{user.birthdate}</span></ListGroupItem>
                                        </ListGroup>
                                        <Card.Footer>
                                            <Button variant="danger" onClick={this.handleRemoveUser}>Delete User</Button>
                                        </Card.Footer>
                                    </Card.Body>
                                </Card> 
                            </Col>
                            <Col />
                        </Row>
                        <Row> 
                            <Col><h3 id="user-video-game-title">{user.username}'s Games</h3></Col>
                        </Row>
                        <Row>         
                            <Col>
                                {React.Children.toArray(userVideoGames.map((userVideoGame) => (
                                    <Card id="video-game-cards" style={{ width: '18rem'}}>
                                        <Card.Img variant="top" src={userVideoGame.video_game.img_url} alt={userVideoGame.title} />
                                        <Card.Body>
                                            <Card.Title>{userVideoGame.video_game.title}</Card.Title>
                                            <Card.Text>{userVideoGame.video_game.description}</Card.Text>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroupItem><b>System:</b> {userVideoGame.video_game.system.name}</ListGroupItem>
                                            <ListGroupItem><b>Genre:</b> {userVideoGame.video_game.genre.name}</ListGroupItem>
                                        </ListGroup>    
                                        <Card.Footer>
                                            <Button onClick={() => handleRemoveGame(userVideoGame)}>Remove Game</Button>
                                        </Card.Footer>
                                    </Card>
                                )))}
                            </Col>
                        </Row>
                        <h3 id="user-reviews">{user.username}'s Reviews</h3>
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
                                {React.Children.toArray(reviews.map((review) => (
                                    review.user.id === user.id &&
                                    <tr>
                                            <td>{user.username}</td>
                                            <td>{review.video_game.title}</td>
                                            <td>{review.title}</td>
                                            <td>{review.description}</td>
                                            <td>{review.stars}</td>
                                        </tr>
                                )))}
                            </tbody>
                        </Table>
                    </Container>  
                : null}
            </div>
        )
    }
}

export default withRouter(Profile)