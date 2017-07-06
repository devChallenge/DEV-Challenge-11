// React
import React from 'react';
import PropTypes from 'prop-types';
// Components
import RaisedButton from 'material-ui/RaisedButton';
import SelectCity from 'components/SelectCity';
import TripsList from 'components/TripsList';

// Core
import * as api from 'core/api';
// Helpers
import Log from 'helpers/log';
import utils from 'helpers/utils';
// Log
const log = Log.withModule('searchPage');


// PropTypes
const propTypes = {
  children: PropTypes.any,
};

// DefaultProps
const defaultProps = {
  children: null,
};

// Style
const compStyle = {
  title: {
    fontSize: '24px',
    margin: '0',
    padding: '0 0 20px 0',
    textAlign: 'center',
  },
  originDestContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '20px',
  },
  searchBtnContainer: {
    textAlign: 'center',
  },
  selectCityContainer: {
    flex: '1', 
    padding: '0px 10px'
  },
  processingContainer: {
    textAlign: 'center',
    fontSize: '24px'
  },
  notFoundMsg: {
    textAlign: 'center',
  }
};

// SearchPage
class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      origin: '',
      destination: '',
      trips: null,
    };
  }

  // Lifecycle hooks

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  // Events

  onOriginChange(e, val){
    log('origin change: ' + val);
    this.setState({origin: val});
  }

  onDestintaionChange(e, val){
    log('destination change: ' + val);
    this.setState({destination: val});
  }

  onSearchClick(e){
    if(e) e.preventDefault();
    log('search click');
    const {
      origin,
      destination,
    } = this.state;
    let reqOpt = {
      origin,
      destination
    }
    if(!origin) return alert('Origin required!');
    if(!destination) return alert('Destinations required!');
    this.setState({processing: true, trips: null});
    api.listTrips(reqOpt, (err, trips) => {
      this.setState({processing: false});
      if(err){
        log.err('list trips err: ' + JSON.stringify(err));
        alert('Searching error!');
      }else{
        this.setState({trips});
      }
    });
  }

  // Render

  render() {
    const { origin, destination, processing, trips } = this.state;
    return (
      <div>
        <h1 style={compStyle.title}>Find the best flights!</h1>
        <div style={compStyle.originDestContainer}>
          <div style={compStyle.selectCityContainer}>
            <SelectCity
              value={origin}
              fullWidth
              floatingLabelText="Origin"
              onChange={(e, val) => this.onOriginChange(e, val)}
            />
          </div>
          <div style={compStyle.selectCityContainer}>
            <SelectCity
              value={destination}
              fullWidth
              floatingLabelText="Destination"
              onChange={(e, val) => this.onDestintaionChange(e, val)}
            />
          </div>
        </div>
        { !processing ? (
          <div style={compStyle.searchBtnContainer}>
            <RaisedButton 
              label="Search" 
              primary={true}
              onTouchTap={e => this.onSearchClick(e)}
            />
          </div>
        ) : (
          <div style={compStyle.processingContainer}>
            <span className="fa fa-spin fa-refresh" />
          </div>
        )}
        {trips && (trips.length == 0) ? (
          <div style={compStyle.notFoundMsg}>Trips not fount....</div>
        ) : null}
        {trips && trips.length ? (
          <TripsList
            items={trips}
          />
        ) : null}
      </div>
    );
  }
}

SearchPage.propTypes = propTypes;
SearchPage.defaultProps = defaultProps;

export default SearchPage;
