import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import AuthService from "../../services/auth.service";

// import { withRouter } from '../common/with-router';
import userService from "../../../services/user.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class UpgradeBodyComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.state = {
      robotId: props.id,
      body: "",
      loading: false,
      message: ""
    };
  }

  onChangeBody(e) {
    this.setState({
        body: e.target.value
    });
  }


  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        userService.post(`robots/${this.props.id}/update`,
        {
          body_series:this.state.body,
        })
        .then(
          () => {
            this.setState({
              loading: false
            });
            this.props.handleClose()
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.setState({
              loading: false,
              message: resMessage
            });
          }
        );
      } else {
        this.setState({
          loading: false
        });
      }
  }

  render() {
    return (

      <Modal show={this.props.isActive} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upgrade Body</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={this.props.handleSubmit}
            ref={c => {
              this.form = c;
            }}
          >
            Choose body you want to replace at robot {this.props.id}
            <br/>
            Specify body id
            <div className="form-group">
              <label htmlFor="asteroid">Body</label>
              <Input
                type="text"
                className="form-control"
                name={"body"}
                value={this.state.body}
                onChange={this.onChangeBody}
                validations={[required]}
              />
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={this.handleSubmit} disabled={this.state.loading}>
            Replace
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default UpgradeBodyComponent;
// export default withRouter(Login);