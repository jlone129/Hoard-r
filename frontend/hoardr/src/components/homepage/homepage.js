import React, { Component } from "react";
import { withRouter } from "react-router";

class Homepage extends Component {
     render () {
         return (
             <h1>Homepage</h1>
         )
     }
}

export default withRouter(Homepage);