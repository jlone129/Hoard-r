import React, { Component } from 'react'
import { 
    Button,
    Card, 
    Container,
    ListGroup, 
    ListGroupItem, 
} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Review from '../Review/Review';

class Index extends Component {

    constructor() {
        super()
        this.state ={
            created: false
        }
    }

    handleAddGame = (videoGame, currentUser, e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/user_video_games/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                user_video_game: {
                    "videoGame": videoGame, 
                    "user": currentUser
                }
            }),
        })
        .then((res) => res.json())
        .then(() => {
            return alert("Game Successfully Added")
        })
    }

    render() {
        const { 
            reviews, 
            currentUser, 
            addReview, 
            editReview, 
            removeReview, 
            handleDeleteReview,
            videoGames
        } = this.props

        const {
            handleAddGame
        } = this

        return(
            <Container>
                <h1 id="video-game-title">Video Games</h1>
                    {React.Children.toArray(videoGames.map((videoGame) => { 
                        return <Card id="video-game" style={{ width: '20rem' }}>
                            <Card.Img variant="top" src={videoGame.img_url} alt={videoGame.title} />
                            <Card.Body>
                                <Card.Title>{videoGame.title}</Card.Title>
                                <Card.Text>{videoGame.description}</Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem><b>System:</b> {videoGame.system.name}</ListGroupItem>
                                <ListGroupItem><b>Genre:</b> {videoGame.genre.name}</ListGroupItem>
                            </ListGroup>
                            <Card.Header><b>Reviews</b></Card.Header>
                            <Review currentUser={currentUser}
                                reviews={reviews}
                                addReview={addReview}
                                editReview={editReview}
                                removeReview={removeReview}
                                videoGame={videoGame}
                                handleDeleteReview={handleDeleteReview}/>
                            <Card.Body>
                                <Button varient="primary" onClick={(e) => handleAddGame(videoGame, currentUser, e)}>
                                    Add to Collection
                                </Button>
                            </Card.Body>
                        </Card>
                    }))}
            </Container>
        )
        
    }
}

export default withRouter(Index)