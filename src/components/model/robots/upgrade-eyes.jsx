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

class UpgradeEyesComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeEyes = this.onChangeEyes.bind(this);
    this.state = {
      robotId: props.id,
      eyes: "",
      loading: false,
      message: ""
    };
  }

  onChangeEyes(e) {
    this.setState({
      eyes: e.target.value
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
        eyes_series:this.state.eyes,
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
          <Modal.Title>Upgrade Eyes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={this.props.handleSubmit}
            ref={c => {
              this.form = c;
            }}
          >
            Choose eyes you want to replace at robot
            <br/>

            Specify eyes id
            <div className="form-group">
              <label htmlFor="asteroid">Eye-sensors</label>
              <Input
                type="text"
                className="form-control"
                name={"eyes"}
                value={this.state.eyes}
                onChange={this.onChangeEyes}
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
export default UpgradeEyesComponent;
// export default withRouter(Login);