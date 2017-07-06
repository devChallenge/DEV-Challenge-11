// React
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Router
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
// Theme
import AppTheme from 'style/theme';
// Components
import ProcessingFullScreen from 'components/ProcessingFullScreen';
import NavigationBar from 'components/NavigationBar';
import SignInDialog from 'components/SignInDialog';
// Pages
import SearchPage from 'pages/SearchPage';
import FlightsPage from 'pages/FlightsPage';
// Core
import * as api from 'core/api';
// Services
import configsStorage from 'services/configsStorage';
// Helpers
import Log from 'helpers/log';
import utils from 'helpers/utils';
// Log
const log = Log.withModule('app');
// Styles
import './app.scss';
import '../node_modules/font-awesome/css/font-awesome.css';

// Init Log
let logEnabled = configsStorage.get('log') || ((typeof ENV !== 'undefined') && (ENV === 'dev'));
if(logEnabled){
    log.enabled(true);
}else{
    log.enabled(false);
}

// Style
const compStyle = {
  content: {
    padding: '40px 20px',
    margin: '0 auto',
    maxWidth: '960px',
    fontSize: '16px',
  },
};

// AppContainer
class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: true,
      user: null,
      signInDialog: {
        key: utils.id.genId(),
        open: false,
      },
    };
  }

  // Lifecycle hooks

  componentDidMount() {
    this.updateUser();
  }

  componentWillUnmount() {

  }

  // Functions

  updateUser() {
    log('getting current user');
    api.me((err, user) => {
      this.setState({ processing: false });
      if (err) {
        log(`getting current user err: ${JSON.stringify(err)}`);
        this.setState({ user: null });
      } else {
        this.setState({ user });
      }
    });
  }

    // Events

  onSignInClick(e) {
    if (e) e.preventDefault();
    log('sign in click');
    this.setState({ signInDialog: {
      key: utils.id.genId(),
      open: true,
    } });
  }

  onSignOutClick(e) {
    if (e) e.preventDefault();
    log('sign out click');
    this.setState({ user: null });
    api.logout((err) => {
      if (err) {
        log(`getting current user err: ${JSON.stringify(err)}`);
      } else {
        log('sign out done');
      }
    });
  }

  onSignInDialogClose(e, isLogIneds) {
    log('sign in dialog close');
    this.updateUser();
    this.setState(prev => ({ signInDialog: {
      key: prev.signInDialog.key,
      open: false,
    } }));
  }

  // Render

  render() {
    const {
        user,
        processing,
        signInDialog,
    } = this.state;

    if (processing === true) return (<ProcessingFullScreen />);

    return (
      <AppTheme>
        <Router>
          <div>
            <NavigationBar
              user={user}
              onSignInClick={e => this.onSignInClick(e)}
              onSignOutClick={e => this.onSignOutClick(e)}
            />
            <div style={compStyle.content}>
              <Switch>
                <Route path="/" component={user && (user.role === 'operator') ? FlightsPage : SearchPage} />
              </Switch>
            </div>
            <SignInDialog
              key={signInDialog.key}
              open={signInDialog.open}
              onClose={(e, res) => this.onSignInDialogClose(e, res)}
            />
          </div>
        </Router>
      </AppTheme>
    );
  }
}

export default AppContainer;


// Inject tap events
injectTapEventPlugin();

// Render
ReactDOM.render((<AppContainer />), document.getElementById('app-container'));
