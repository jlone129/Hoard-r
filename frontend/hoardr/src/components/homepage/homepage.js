import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";

class Homepage extends Component {
     render () {
         return (
             <Container>
                <h1 id="home-title">Welcome to Hord-R</h1>
                <a href="http://localhost:3001/video_games">
                    <Image src="https://i.pinimg.com/originals/72/3d/0a/723d0af616b1fe7d5c7e56a3532be3cd.png" id="homepage-img" roundedCircle/>
                </a>
                <h3 id="click-enter">Click to Enter Hord-R</h3>
             </Container>
         )
     }
}

export default withRouter(Homepage);