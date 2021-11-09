import React, { Component } from 'react';
import { Container, Form } from 'react-bootstrap';
import { withRouter } from 'react-router';

class Review extends Component {

    constructor() {
        super();

        this.state={
            edit: false
        }
    }

    editToggle = () => {
        let edit = !this.state.edit
        this.setState({edit})
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleDeleteReview = () => {
        fetch(`http://localhost:3000/reviews/${this.props.review.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(() => {
            this.props.removeReview(this.props.review)
            alert("Message successfully removed")
        })
    }

    handleEditReview = (e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/reviews/${this.props.review.id}`, {
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

    render() {

        const { handleEditReview, editToggle, handleDeleteReview, handleChange } = this
        const { review } = this.props
        let showReview = ""

        function editReviewForm() {
            return(
                <Container className="w-25 p-3">
                    <Form onSubmit={handleEditReview}>
                        <Form.Group role="form" className="mb-3"></Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" id="title" name="title"></Form.Control>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" id="description" name="description"></Form.Control>
                            <Form.Label>Stars</Form.Label>
                            <Form.Control type="integer" id="stars" name="stars"></Form.Control>
                            <Button type="submit">Update Review</Button>
                    </Form>
                </Container>
            )
        }

        if(this.state.edit) {
            showReview = editReviewForm()
        } else {
            showReview = null
        }

        return (
            <div>
                <h1>Review Controller</h1>
            </div>
        )
    }
}

export default withRouter(Review);