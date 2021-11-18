import React, { Component } from 'react'
import { 
    Card, 
    ListGroup, 
    ListGroupItem, 
    Button, 
    Alert
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

    handleAddGame = (e) => {
        e.preventDefault()

        const { videoGame } = this.props

        fetch(`http://localhost:3000/video_games/${videoGame.id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                review: {
                    "title": e.target[0].value,
                    "description": e.target[1].value,
                    "stars": e.target[2].value,
                    "video_game": this.props.videoGame,
                    "user": this.props.currentUser,
                }
            }),
        })
        .then((res) => res.json())
        .then((newUserGame) => {
            this.props.addUserGame(newUserGame)
            if(newUserGame.status === "created") {
                this.setState({created: true})
                return(<Alert>Game successfully added</Alert>)
            }
            this.addToggle()
        })

    }

    render() {
        const { 
            videoGame, 
            reviews, 
            currentUser, 
            addReview, 
            editReview, 
            removeReview, 
            handleDeleteReview 
        } = this.props

        return(
            <div>
                    <Card style={{ width: '20rem' }}>
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
                                <Button varient="primary">Add to Collection</Button>
                        </Card.Body>
                    </Card>
            </div>
        )
        
    }
}

export default withRouter(Index)