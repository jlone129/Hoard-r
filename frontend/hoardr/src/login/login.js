import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Homepage from "../homepage/homepage";

const url = "http://localhost:3000/login"
class Login extends Component {
    constructor(){
        super()
        this.state = {
            name: "",
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

        const {name, password} = this.state

        const user = {name, password}

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
            <div className="login">
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="inline fields">
                        <h3>Login Page</h3>
                        <label htmlFor="username"><p>Username</p></label>
                        <input type="text" id="username" placeholder="John Doe" name="username" onChange={handleChange} />
                        <label htmlFor="password"><p>Password</p></label>
                        <input type="password" id="password" placeholder="V1d30G@me$" name="password" onChange={handleChange} />
                        <button type="submit">Login</button>
                        <a href="/registration">First Time User</a>
                    </div>
                </form>

                {this.state.errorMessage !== "" ? <h4 className="error">{this.state.errorMessage}</h4> : null}
            </div>
        )
    }
}

export default withRouter(Login)