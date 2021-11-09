import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Form, Button, Container } from 'react-bootstrap'

class Update extends Component {

  constructor() {
    super();
    
    this.state = {
      img_url: "",
      password: "",
      email: "",
      birthdate: "",
      updated: false
    }
  }
  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/users/${this.props.user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        "email": e.target[1].value,
        "password": e.target[2].value,
        "password_confirmation": e.target[3].value,
        "img_url": e.target[4].value,
        "birthdate": e.target[5].value
        }
      ),
    })
      .then((res) => res.json())
      .then((editedUser) => {
        this.props.editUser(editedUser)
        if(editedUser.status === "created") {
          this.setState({updated: true})
        }
      });
  };

  render() {

    const { handleChange, handleSubmit } = this
    const { user } = this.props

    return (
      <div>
        <Container className="w-25 p-3">
        <h1>Update {user.username}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group role="form" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" id="username" name="username" value={user.username} readOnly/>
              <Form.Label>Email address <span id="form-required">*</span></Form.Label>
              <Form.Control type="email" id="email" name="email" defaultValue={user.email} onChange={handleChange}/>
              <Form.Label>Password <span id="form-required">*</span></Form.Label>
              <Form.Control type="password" id="password" name="password" placeholder="Password" onChange={handleChange} />
              <Form.Label>Password Confirmation <span id="form-required">*</span></Form.Label>
              <Form.Control type="password" id="password-confirmation" name="password" placeholder="Confirm Password" onChange={handleChange}/>
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="text" id="img_url" name="img_url" defaultValue={user.img_url} onChange={handleChange}/>
              <Form.Label>Date of Birth <span id="form-required">*</span></Form.Label>
              <Form.Control type="date" id="birthdate" name="birthdate" defaultValue={user.birthdate} onChange={handleChange}/>
              <Button variant="primary" type="submit">Submit</Button>
            </Form.Group>
          </Form>
        </Container> 
      </div>
    )
  }
}

export default withRouter(Update);
