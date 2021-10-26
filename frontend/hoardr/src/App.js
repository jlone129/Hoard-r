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

const urlUsers = `http://localhost:3000/users/`
const urlReviews = `http://localhost:3000/reviews/`
const urlLogout = `http://localhost:3000/logout`

class App extends React.Component {

  state = {
    users: [],
    reviews: [],
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
      .then(([users, reviews]) => this.setState({
        users: users,
        reviews: reviews
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

  addReview = newReview => {
    this.setState({ reviews: [...this.state.reviews, newReview] })
  }

  removeReview = delReview => {
    this.setState({ reviews: this.state.reviews.filter(review => review.id !== delReview.id) })
  }

  editReview = editedReview => {
    let newReviews = this.state.reviews.map( review => {
      if(review.id === editedReview.id){
        return editedReview
      } else {
        return review
      }
    })
    this.setState({ reviews: newReviews })
  }

  removeUser = delUser => {
    this.setState({ users: this.state.users.filter(user => user.id !== delUser.id)})
  }

  render() {
    // const { addUser, addReview } = this
    return (
      <Router>
        <div>
          <ul className="navbar">
            <li className="homepage">
              <Link to="/" >Home</Link>
            </li>
            {this.state.currentUser ?
            <li className="logout-link" onClick={this.handleLogout}>
              <Link to="/login">Logout</Link>
            </li>
            :
            <li className="login-link">
              <Link to="/login">Login</Link>
            </li>
            }
          </ul>

          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="login">
              <Login setCurrentUser={this.setCurrentUser}/>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }

}

export default App;
