import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Form, Button, Container } from 'react-bootstrap'

class Update extends Component {

  constructor() {
    super();
    
    this.state = {
      username: "",
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
    const { user } = this.props
    const {
      username,
      img_url,
      password,
      email,
      birthdate
    } = this.state;

    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          "username": username,
          "img_url": img_url,
          "password": password,
          "password_confirmation": password,
          "email": email,
          "birthdate": birthdate
        }
      }),
    })
      .then((res) => res.json())
      .then((editedUser) => {
        this.props.editUser(editedUser)
        if(editedUser.status === "created") {
          this.setState({updated: true})
        }
        this.props.history.push("/profile")
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
