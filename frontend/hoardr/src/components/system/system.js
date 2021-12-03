import React, { Component } from 'react'
import { Card, Container } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

class System extends Component {

    render() {
        const { systems } = this.props
        return (
            <Container>
                <h1>Systems Page</h1>
                {React.Children.toArray(systems.map((system) => (
                    <Card style={{display: 'flex', flexDirection: 'row', flex: 1}}>
                        <Card.Header>
                            <Card.Img src={system.img_url} alt={system.name} id="thumbnail-pic" />
                        </Card.Header>
                        <Card.Body id="body-content">
                            <Card.Title>{system.name}</Card.Title>
                            <Card.Text>{system.brand}</Card.Text>
                            <Card.Text><b>Start Date:</b></Card.Text>
                            <Card.Text>{system.year}</Card.Text>
                            <Card.Text>{system.description}</Card.Text>
                            <Card.Text>{system.generation.name}</Card.Text>
                        </Card.Body>
                    </Card>
                )))}
            </Container>
        )
    }

}

export default withRouter(System)