import React, { Component } from 'react';
import { withRouter } from "react-router-dom"

class UserVideoGame extends Component {
  render() {
    return (
      <div>
        <h1>User Video Games</h1>
      </div>
    )
  }
}

export default withRouter(UserVideoGame);
