import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class Subgenre extends Component {
  render() {
    const { subgenre } = this.props
    return (
      <div>
        <h1>Subgenres</h1>
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
                <td><img src={subgenre.img_url} alt={subgenre.name}/></td>
                <td>{subgenre.name}</td>
                <td>{subgenre.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}


export default withRouter(Subgenre);
