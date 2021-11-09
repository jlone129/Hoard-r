import React, { Component } from 'react'
import { Card, ListGroup, ListGroupItem, Button, Container } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

// const videoGameURL = `http://localhost:3000/video_games/`

class Index extends Component {
    render() {
        const { videoGame } = this.props
        return (
            <div>
                <Container>
                    <h1>Video Game Library</h1>
                    <Card style={{ width: '16rem' }}>
                        <Card.Img variant="top" src={videoGame.img_url} alt={videoGame.title} />
                        <Card.Body>
                            <Card.Title>{videoGame.title}</Card.Title>
                            <Card.Text>{videoGame.description}</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><b>System:</b> {videoGame.system.name}</ListGroupItem>
                            <ListGroupItem><b>Genre:</b> {videoGame.genre.name}</ListGroupItem>
                        </ListGroup>
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