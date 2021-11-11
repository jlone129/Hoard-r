import React, { Component } from 'react';
import { Container, Form, Button, CloseButton, Card, Carousel, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router';

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
            edit: false
        }
    }

    getReview = () => {
        const { videoGame, reviews, currentUser, handleDeleteReview } = this.props

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
                            </Carousel.Item>
                        </Carousel>
                    </>
                );
            }
        }))
    }

    editToggle = () => {
        let edit = !this.state.edit
        this.setState({edit})
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
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
                return(<Alert>Review successfully added</Alert>)
            }
        })
    }

    handleEditReview = (e) => {
        e.preventDefault()

        let rev;

        this.props.reviews.map(review => rev = review)

        fetch(`http://localhost:3000/reviews/${rev.id}`, {
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
            this.editToggle()
        })
    }

    editReviewForm = () => {

        let { reviews } = this.props
        let { handleChange, handleEditReview } = this

        return React.Children.toArray(reviews.map( review =>{
            return(
                <Container className="w-100 p-3">
                    <Form onSubmit={handleEditReview}>
                        <Form.Group role="form" className="mb-3" id="editReviewForm">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                id="title" 
                                name="title" 
                                defaultValue={review.title} 
                                onChange={handleChange} />
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text" 
                                id="description" 
                                name="description" 
                                defaultValue={review.description} 
                                onChange={handleChange} />
                            <Form.Label>Stars</Form.Label>
                            <Form.Control 
                                type="integer" 
                                id="stars" 
                                name="stars" 
                                defaultValue={review.stars} 
                                onChange={handleChange} />
                            <Button type="submit">Update Review</Button>
                        </Form.Group>
                    </Form>
                </Container>
            )
        }))
    }

    //Allows current user to see the review edit form
    editToggleButton = () => {
        
        let { editToggle } = this

        return React.Children.toArray(this.props.reviews.map(review => {
            if(review.user.id === this.props.currentUser.id) {
                return ( <Button onClick={editToggle}>Edit Review</Button> )
            } else {
                return( <Button disabled>Edit Review</Button> )
            }
        }))
    }

    render() {

        const { getReview, editToggleButton, editReviewForm} = this
        const { edit } = this.state

        return (
            <>
                {getReview()}   
                {editToggleButton()}
                { edit === true ? editReviewForm() : null }
            </>
        )
    }
}

export default withRouter(Review);