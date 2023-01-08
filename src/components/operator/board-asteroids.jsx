import React, { Component } from "react";
import Form from "react-validation/build/form";


import AuthService from "../../services/auth.service";

import { withRouter } from '../../common/with-router';

class BoardAsteroidOperator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asteroids: [
                {
                    id: 1, name: "A27dD", distance: 288,
                },
                {
                    id: 2, name: 'DSA10293', distance: 12,

                },
                {
                    id: 3, name: "ASD12732", distance: 199,

                }
            ],
        };
    }

    render() {
        return (
            <div className="col-md-12">
                <div>
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
export default withRouter(BoardAsteroidOperator);