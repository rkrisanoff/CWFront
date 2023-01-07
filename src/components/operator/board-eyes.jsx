import React, { Component } from "react";
import Form from "react-validation/build/form";


import AuthService from "../../services/auth.service";

import { withRouter } from '../../common/with-router';

class BoardEyesOperator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eyes: [
                {
                    release_series: 1, name: 2, cost: 3, distance: 4
                },
                {
                    release_series: 3, name: 2, cost: 3, distance: 4
                },
                {
                    release_series: 2, name: 2, cost: 3, distance: 4
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
                                {["release_series", "name", "cost", "distance"].map(value => <th scope="col">{value}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.eyes.map(
                                ({ release_series, name, cost, distance }) => (
                                    <tr>
                                        <th scope="row">{release_series}

                                        </th>

                                        <td>{name}

                                        </td>
                                        <td>{cost}</td>
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
export default withRouter(BoardEyesOperator);