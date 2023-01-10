import React, { Component } from "react";
import Form from "react-validation/build/form";


import AuthService from "../../services/auth.service";

import { withRouter } from '../../common/with-router';
import userService from "../../services/user.service";

class BoardBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bodies: [],
        };
    }
    componentDidMount() {
        userService.get("body/all")
            .then(
                ({ data }) => {
                    this.setState({
                        bodies: data
                    })
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||error.toString();
                        console.log(resMessage);
                }
            );
    }
    render() {
        return (
            <div className="col-md-12">
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                {["release series", "name", "cost", "max_hit_points"].map(value => <th scope="col">{value}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.bodies.map(
                                ({ releaseSeries, name, cost, max_hit_points }) => (
                                    <tr>
                                        <th scope="row"key={releaseSeries}>{releaseSeries}

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