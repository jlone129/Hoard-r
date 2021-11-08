import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Button, Form } from "react-bootstrap"

const url = "http://localhost:3000/login"
class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            loggedIn: false,
            currentUser: "",
            errorMessage: ""
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleLogin = (e) => {
        e.preventDefault()
        e.target.reset()

        const {username, password} = this.state

        const user = {username, password}

        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user})
        })
        .then(res => res.json())
        .then(response => {
            if(response.message){
                return this.setState({ errorMessage: response.message })
            }
            localStorage.setItem("token", response.jwt)
            this.props.setCurrentUser(response.user)
            this.props.history.push('/profile')
        })
    }

    greeting = (message) => {
        return <h3>{ message }</h3>
    }

    render() {
        const {handleLogin, handleChange} = this
        return (
            <div id="login">
                <Container className="w-25 p-3">
                <h1>Login Page</h1>
                {this.state.errorMessage !== "" ? <h6 id="error-message">{this.state.errorMessage}</h6> : null}
                <Form onSubmit={handleLogin}>
                    <Form.Group role="form" className="mb-3" controlId="formUser">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                        <Button type="submit">Login</Button>
                    </Form.Group>
                </Form>
                <a href="/registration">First Time User</a>
                </Container>
            </div>
        )
    }
}

export default withRouter(Login)