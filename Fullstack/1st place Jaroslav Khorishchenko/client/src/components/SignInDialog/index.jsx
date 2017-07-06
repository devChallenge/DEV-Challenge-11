// React
import React from 'react';
import PropTypes from 'prop-types';
// Components
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
// Helpers
import Log from 'helpers/log';
// API
import * as api from 'core/api';
// Log
const log = Log.withModule('signInDialog');

// PropTypes
const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

// DefaultProps
const defaultProps = {
  children: null,
};

// Style
const compStyle = {
  container: {
    maxWidth: '500px',
  },
  row: {

  },
};

// SignInDialog
class SignInDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
    };
  }

    // Lifecycle hooks

  componentDidMount() {

  }

  componentWillUnmount() {

  }

    // Events

  onSignInClick(e) {
    log('sign in click');
    const {
            email,
            pass,
        } = this.state;
    if (!email) return alert('Email required!');
    if (!pass) return alert('Password required!');
    api.login(email, pass, (err, user) => {
      if (err) {
        log.err(`signin err: ${JSON.stringify(err)}`);
        alert('Sign in error! Please check your email and password.');
      } else {
        this.props.onClose(e, true);
      }
    });
  }

    // Render

  render() {
    const {
            open,
            onClose,
        } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={e => onClose(e, false)}
      />,
      <FlatButton
        label="Sign In"
        primary={false}
        onTouchTap={e => this.onSignInClick(e)}
      />,
    ];

    return (
      <Dialog
        open={open}
        title="Sign In"
        actions={actions}
        modal
        contentStyle={compStyle.container}
        onRequestClose={e => onClose(e, false)}
      >
        <div style={compStyle.row}>
          <TextField
            type="email"
            fullWidth
            value={this.state.email}
            hintText="some@gmail.com"
            floatingLabelText="Email"
            onChange={(e, val) => this.setState({ email: val })}
          />
        </div>
        <div style={compStyle.row}>
          <TextField
            type="password"
            fullWidth
            value={this.state.pass}
            hintText="Your pass"
            floatingLabelText="Password"
            onChange={(e, val) => this.setState({ pass: val })}
          />
        </div>
      </Dialog>
    );
  }
}

SignInDialog.propTypes = propTypes;
SignInDialog.defaultProps = defaultProps;

export default SignInDialog;
