import React, { Component } from 'react'
import { Card, ListGroup, ListGroupItem, Button, Container, Carousel, CarouselItem, CloseButton } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

// const videoGameURL = `http://localhost:3000/video_games/`

class Index extends Component {

    constructor() {
        super();

        this.state = {
            title: "",
            description: "",
            stars: 0,
            video_game: {},
            user: {},
            created: false
        }
    }

    handleAddReview = (e) => {
        e.preventDefault();
        const {
            title,
            description,
            stars
        } = this.state;

        fetch(`http://localhost:3000/reviews/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                review: {
                    "title": title,
                    "description": description,
                    "stars": stars,
                    "video_game": this.props.videoGame,
                    "user": this.props.currentUser,
                }
            }),
        })
        .then((res) => res.json())
        .then((newReview) => {
            this.props.addReview(newReview)
            if(newReview.status === "created") {
                this.setState({created: true})
            }
        })
    }

    getReview = () => {
        const { videoGame, reviews, currentUser, handleDeleteReview, handleAddReview } = this.props

        return React.Children.toArray(reviews.map(review => {
            let today = new Date( Date.now() )
            let oneDay = 1000 * 60 * 60 * 24
            let updated = new Date(review.updated_at)
            let timeDifference = Math.abs(today - updated)
            let dayDifference = Math.ceil(timeDifference / oneDay)

            if(review.video_game.id === videoGame.id) {
                return (
                    <>
                        <Carousel fade>
                            <Carousel.Item>
                                <Card.Body>
                                    {currentUser.id === review.user.id ?
                                        <CloseButton id="close-button" onclick={handleDeleteReview}/>
                                    :
                                        <CloseButton id="close-button" disabled />
                                    }
                                    <Card.Text><Card.Img src={review.user.img_url} id="review-pic" /><b>{review.user.username}</b></Card.Text>
                                    <Card.Title><b>{review.title}</b></Card.Title>
                                    <Card.Text>{review.description}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last Updated: {dayDifference} days ago</small>
                                </Card.Footer>
                            </Carousel.Item>
                        </Carousel>
                    </>
                );
            }
        }))
    }

    render() {
        const { children, videoGame, reviews } = this.props


        return(
            <div>
                <Container>
                    <h1>Video Game Library</h1>
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
                        {this.getReview() || "Not Rendered Yet"}
                        <Card.Body>
                                <Button varient="primary">Add to Collection</Button>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
        
    }
}

export default withRouter(Index)