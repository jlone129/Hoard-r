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

    handleAddGame = (videoGame, e) => {
        e.preventDefault()

        console.log(videoGame, "this is video game")

        fetch(`http://localhost:3000/user_video_games/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                "videoGame": videoGame
            }),
        })
        .then((res) => res.json())
        .then((newUserGame) => {
            console.log("user videogame: ", newUserGame)
            this.props.addUserGame(newUserGame)
            if(newUserGame.status === "created") {
                this.setState({created: true})
                return(<Alert>Game successfully added</Alert>)
            }
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
            React.Children.toArray(videoGames.map((videoGame) => {
                
                return <div>
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
                                <Button varient="primary" onClick={(e) => handleAddGame(videoGame, e)}>Add to Collection</Button>
                            </Card.Body>
                        </Card>
                </div>
            }))
        )
        
    }
}

export default withRouter(Index)