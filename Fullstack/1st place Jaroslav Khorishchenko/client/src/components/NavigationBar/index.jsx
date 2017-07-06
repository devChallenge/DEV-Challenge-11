// React
import React from 'react';
import PropTypes from 'prop-types';
// Components
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
// Helpers
import Log from 'helpers/log';
// Log
const log = Log.withModule('navigationBar');

// PropTypes
const propTypes = {
  user: PropTypes.any,
  onSignInClick: PropTypes.func.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
};

// DefaultProps
const defaultProps = {
  children: null,
};

// Style
const compStyle = {

};

// NavigationBar
class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    // Lifecycle hooks

  componentDidMount() {

  }

  componentWillUnmount() {

  }

    // Events

  onTitleTouchTap(e) {
    e.preventDefault();
    log('title touch tap');
  }

  onAuthBtnClick(e) {
    if (this.props.user) this.props.onSignOutClick(e);
    else this.props.onSignInClick(e);
  }

    // Render

  render() {
    const {
            user,
        } = this.props;

    const btn = {};

    return (
      <AppBar
        style={compStyle.container}
        title={TITLE}
        showMenuIconButton={false}
        iconElementLeft={null}
        iconElementRight={<FlatButton
          label={user ? 'Sign out' : 'Sign in'}
          onClick={e => this.onAuthBtnClick(e)}
        />}
        onTitleTouchTap={e => this.onTitleTouchTap(e)}
      />
    );
  }
}

NavigationBar.propTypes = propTypes;
NavigationBar.defaultProps = defaultProps;

export default NavigationBar;
