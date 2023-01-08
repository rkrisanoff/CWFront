import React, { Component } from "react";
import Form from "react-validation/build/form";


import AuthService from "../../services/auth.service";

import { withRouter } from '../../common/with-router';
import userService from "../../services/user.service";

class BoardAsteroid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asteroids: [],
        };
    }
    componentDidMount() {
        userService.get("asteroids/all")
            .then(
                ({ data }) => {
                    this.setState({
                        asteroids: data.slice(0, 50)
                    })
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message || error.toString();
                    console.log(resMessage);
                }
            );
    }
    render() {
        return (
            <div className="col-md-12">
                <div>
                    <h1>Asteroids</h1>

                    <table class="table">
                        <thead>
                            <tr>
                                {["id", "name", "distance"].map(value => <th scope="col">{value}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.asteroids.map(
                                ({ id, name, distance }) => (
                                    <tr>
                                        <th scope="row">{id}
                                        </th>
                                        <td>{name}
                                        </td>
                                        <td>{distance}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default withRouter(BoardAsteroid);