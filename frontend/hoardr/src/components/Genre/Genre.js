import React, { Component } from 'react'
import { Card, Container } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

class Genre extends Component {
  
  render() {
    const { genres } = this.props
    return (
      <Container>
        <h1 id="profile-title">Genres Page</h1>
        {React.Children.toArray(genres.map((genre) => (
          <Card id="card-hover-zoom" style={{display: 'flex', flexDirection: 'row', flex: 1, width: '40rem'}}>
            <Card.Header>
              <Card.Img src={genre.img_url} alt={genre.name} id="thumbnail-pic" />
            </Card.Header>
            <Card.Body id="body-content">
              <Card.Title>{genre.name}</Card.Title>
              <Card.Text>{genre.description}</Card.Text>
            </Card.Body>
          </Card>
        )))}
      </Container>
    )
  }
}

export default withRouter(Genre);
