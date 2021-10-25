import React from "react";

class Login extends React.Component {
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
}