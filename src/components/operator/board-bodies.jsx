import React, { Component } from "react";
import Form from "react-validation/build/form";


import AuthService from "../../services/auth.service";

import { withRouter } from '../../common/with-router';

class BoardBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bodies: [
                {
                    release_series: 1, name: 2, cost: 3, max_hit_points: 4
                },
                {
                    release_series: 3, name: 2, cost: 3, max_hit_points: 4
                },
                {
                    release_series: 2, name: 2, cost: 3, max_hit_points: 4
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
                                {["release_series", "name", "cost", "max_hit_points"].map(value => <th scope="col">{value}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.bodies.map(
                                ({ release_series, name, cost, max_hit_points }) => (
                                    <tr>
                                        <th scope="row">{release_series}

                                        </th>

                                        <td>{name}

                                        </td>
                                        <td>{cost}</td>
                                        <td>{max_hit_points}</td>


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
export default withRouter(BoardBody);