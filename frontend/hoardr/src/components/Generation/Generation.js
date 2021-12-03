import React, { Component } from 'react'
import { Card, Container } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

class Generation extends Component {

  render() {
    const { generations } = this.props
    return (
      <Container>
        <h1>Generations Page</h1>
          {React.Children.toArray(generations.map((gen) => {
            return <Card style={{display: 'flex', flexDirection: 'row', flex: 1}}>
              <Card.Header>
                <Card.Img src={gen.img_url} alt={gen.name} id="thumbnail-pic" />
              </Card.Header>
              <Card.Body id="body-content">
                <Card.Title>{gen.name}</Card.Title>
                <Card.Text>{gen.description}</Card.Text>
                <Card.Text><b>Start Date:</b></Card.Text>
                <Card.Text>{gen.start_date}</Card.Text>
                <Card.Text><b>End Date:</b></Card.Text>
                <Card.Text>{gen.end_date}</Card.Text>
              </Card.Body>
            </Card>
          }))}
      </Container>
    )
  }
}

export default withRouter(Generation);
