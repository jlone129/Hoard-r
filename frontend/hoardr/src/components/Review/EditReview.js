import React, { Component } from "react"
import { Container, Form, Button } from 'react-bootstrap';



class EditReviewForm extends Component {

    constructor() {
        super();

        this.state = {
            edit: false,
        }
    }

    toggleState = () => {
        let edit = !this.state.edit
        this.setState({edit})
    }

    render() {

        const { 
            review
         } = this.props
        let { handleChange, handleEditReview } = this.props

        if (this.state.edit === false) {
            return <Button onClick={this.toggleState}>Edit Comment</Button>  
        } else {
            return(
                <>
                    <Button onClick={this.toggleState}>Cancel Edit</Button>
                    <Container className="w-100 p-3">
                        <Form onSubmit={(e) => handleEditReview(review.id, e)}>
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
                </>
            )
        }
    }
}

export default EditReviewForm;