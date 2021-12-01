import React, { Component } from 'react';
import { Container, Form, Button, CloseButton, Card, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router';
import EditReviewForm from './EditReview';
import 'bootstrap/dist/css/bootstrap.min.css';

class Review extends Component {

    constructor() {
        super();

        this.state = {
            title: "",
            description: "",
            stars: 0,
            video_game: {},
            user: {},
            created: false,
            add: false
        }
    }

    addToggle = () => {
        let add = !this.state.add
        this.setState({add})
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleAddReview = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3000/reviews/`, {
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
        .then((newReview) => {
            this.props.addReview(newReview)
            if(newReview.status === "created") {
                this.setState({created: true})
                return(<Alert>Review successfully added</Alert>)
            }
            this.addToggle()
        })
    }

    handleEditReview = (id, e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/reviews/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                "title": e.target[0].value,
                "description": e.target[1].value,
                "stars": e.target[2].value
            })
        })
        .then(res => res.json())
        .then(editedReview => {
            this.props.editReview(editedReview) 
        })
    }

    addReviewForm = () => {

        let { handleChange, handleAddReview } = this
        return(
            <Container className="w-100 p-3">
                <Form onSubmit={handleAddReview}>
                    <Form.Group role="form" className="mb-3" id="addReviewForm">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Title"
                            onChange={handleChange} />
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Description"
                            onChange={handleChange} />
                        <Form.Label>Stars</Form.Label>
                        <Form.Control
                            type="integer"
                            id="stars"
                            name="stars"
                            placeholder="Enter 1 - 5"
                            onChange={handleChange} />
                        <Button type="submit">Add Review</Button>
                    </Form.Group>
                </Form>
            </Container>
        )
    }


    getReview = () => {
        const {
            videoGame,
            reviews,
            currentUser,
            handleDeleteReview,
        } = this.props

        let { handleChange, handleEditReview } = this

        return React.Children.toArray(reviews.map(function(review) {
            let today = new Date( Date.now() )
            let oneDay = 1000 * 60 * 60 * 24
            let updated = new Date(review.updated_at)
            let timeDifference = Math.abs(today - updated)
            let dayDifference = Math.ceil(timeDifference / oneDay)

            if(videoGame.id === review.video_game.id){
                return(
                    <>
                        <Card.Body>
                            {currentUser.id === review.user.id ?
                                <CloseButton id="close-button" onClick={handleDeleteReview}/>
                            :
                                <CloseButton id="close-button" disabled />
                            }
                            <Card.Text><Card.Img src={review.user.img_url} id="review-pic" /><b>{review.user.username}</b></Card.Text>
                            <Card.Title><b>{review.title}</b></Card.Title>
                            <Card.Text>{review.description}</Card.Text>
                            <Card.Text><b>Stars: </b>{review.stars}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last Updated: {dayDifference} days ago</small>
                        </Card.Footer>
                        {currentUser.id === review.user.id ?
                            <EditReviewForm
                                handleChange={handleChange}
                                handleEditReview={handleEditReview}
                                review={review}
                            />
                        : null }
                    </>
                )
            } else {
                return null
            }
        }))
    }

    render() {

        const {
            getReview,
            addToggle,
            addReviewForm
        } = this

        const { add } = this.state

        // TODO: Swap out review with the edit form when edit is True; Only display a review if it is not being edited currently
        return (
            <>
                {getReview()}
                { add ? null : <Button onClick={addToggle}>Add Review</Button> }
                { add === true ? addReviewForm() : null }
            </>
        )
    }
}

export default withRouter(Review);