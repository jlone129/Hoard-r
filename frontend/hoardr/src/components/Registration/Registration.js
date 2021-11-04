import React, {Component} from 'react';
import { withRouter } from 'react-router';
import { Form, Button, Container } from 'react-bootstrap'

const userUrl = `http://localhost:3000/users/`

class Registration extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      img_url: "",
      password: "",
      email: "",
      birthdate: "",
      created: false
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      img_url,
      password,
      email,
      birthdate
    } = this.state;

    fetch(userUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          "username": username,
          "img_url": img_url,
          "password": password,
          "email": email,
          "birthdate": birthdate
        }
      }),
    })
      .then((res) => res.json())
      .then((newUser) => {
        this.props.addUser(newUser)
        if (newUser.status === "created") {
          this.setState({created: true})
          this.props.history.push("/login")
        }
      });
  };

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    const { handleChange, handleSubmit } = this;
    return(
      <div>
        <Container className="w-25 p-3">
        <h1>Registration</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group role="form" className="mb-3" controlId="formUser">
              <Form.Label>Username <span id="form-required">*</span></Form.Label>
              <Form.Control type="text" placeholder="Username" onChange={handleChange}/>
              <Form.Label>Email address <span id="form-required">*</span></Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={handleChange}/>
              <Form.Label>Password <span id="form-required">*</span></Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={handleChange} />
              {/* <Form.Label>Password Confirmation<span id="form-required">*</span></Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" onChange={handleChange}/> */}
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="file" onChange={handleChange}/>
              <Form.Label>Date of Birth <span id="form-required">*</span></Form.Label>
              <Form.Control type="date" name="dob" placeholder="Birthdate" onChange={handleChange}/>
              <Button variant="primary" type="submit">Submit</Button>
            </Form.Group>
          </Form>
        </Container> 
      </div>
    )
  }
}

export default withRouter(Registration);