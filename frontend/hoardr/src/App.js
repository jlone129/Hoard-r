import React from 'react'
import Homepage from './components/homepage/homepage'
import Login from './components/login/login'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const urlUsers = 'http://localhost:3000/users'
const urlReviews = 'http://localhost:3000/reviews'
const urlLogout = 'http://localhost:3000/logout'

class App extends React.Component {

  state = {
    users: [],
    messages: [],
    currentUser: null
  }

  componentDidMount() {
    if(localStorage.token){
      fetch('http://localhost:3000/user', {
        headers: {
          "Authorization": `Bearer ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then(user => this.setState({currentUser: user}))
    }
    Promise.all([
      fetch(urlUsers),
      fetch(urlReviews)
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([users, messages]) => this.setState({
        users: users,
        messages: messages
      }))
  }

  handleLogout = () => {

    fetch(urlLogout, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(response => {
      if(response.message){
        return this.setState({errorMessage: response.message})
      }
      localStorage.clear()
      localStorage.removeItem("token")
      this.setCurrentUser(null)
      return <Redirect to="/login" />
    })
  }

  setCurrentUser = user => {
    this.setState({ currentUser: user })
  }

  addUser = newUser => {
    this.setState({ users: [...this.state.users, newUser] })
  }

}

export default App;
