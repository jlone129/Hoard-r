import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

class System extends Component {

    render() {
        const { system } = this.props
        return (
            <div className="systemsPage">
                <div className="systems">
                    <h1>Systems</h1>
                    <table>
                        <thead>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Year</th>
                            <th>Description</th>
                        </thead>
                        <tbody>
                            <td><img src={system.img_url}/></td>
                            <td>{system.name}</td>
                            <td>{system.brand}</td>
                            <td>{system.year}</td>
                            <td>{system.description}</td>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default withRouter(System)