import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

class Genre extends Component {
  
  render() {
    const { genre } = this.props
    return (
      <div>
        <h1>Genres</h1>
        <div className="genres">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Genre-Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src={genre.img_url} alt={genre.name}/></td>
                <td>{genre.name}</td>
                <td>{genre.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default withRouter(Genre);
