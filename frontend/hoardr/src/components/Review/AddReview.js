import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap'; 

class AddReview extends Component {
    render() {
        const {
            handleAddReview,
            handleChange
        } = this.props;

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
}

export default AddReview
