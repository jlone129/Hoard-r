import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

class Generation extends Component {

  render() {
    const { gen } = this.props
    return (
      <div>
        <h1>Generations Page</h1>
        <div className="gen-table">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Image</th>
                <th>Generation</th>
                <th>Start Year</th>
                <th>End Year</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src={gen.img_url} alt={gen.name}/></td>
                <td>{gen.name}</td>
                <td>{gen.start_date}</td>
                <td>{gen.end_date}</td>
                <td>{gen.description}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

export default withRouter(Generation);
