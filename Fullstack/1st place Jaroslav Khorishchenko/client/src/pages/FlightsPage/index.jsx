// React
import React from 'react';
import PropTypes from 'prop-types';
// Components
import EditFlightDialog from 'components/EditFlightDialog';
import FligtsList from 'components/FligtsList';
import IconButton from 'material-ui/IconButton';
// Core
import * as api from 'core/api';
// Helpers
import Log from 'helpers/log';
import utils from 'helpers/utils';
// Log
const log = Log.withModule('flightsPage');

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
  topPanel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

// FlightsPage
class FlightsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      items: [],
      editFlightDialog: {
        key: utils.id.genId(),
        open: false,
        item: null,
      },
    };
  }

    // Lifecycle hooks

  componentDidMount() {
    this.updateFlights();
  }

  componentWillUnmount() {

  }

    // Functionality

  updateFlights() {
    log('updating flights');
    this.setState({ processing: true });
    api.listFlights((err, items) => {
      this.setState({ processing: false });
      if (err) {
        log.err(`getting flights err: ${JSON.stringify(err)}`);
      } else {
        log(items);
        this.setState({ items });
      }
    });
  }

    // Events

  onEditClick(e, item) {
    if (e) e.preventDefault();
    log('edit item click');
    log(item);
    this.setState({ editFlightDialog: {
      key: utils.id.genId(),
      open: true,
      item,
    } });
  }

  onRemoveClick(e, item) {
    if (e) e.preventDefault();
    log('remove item click');
    if (confirm(`Are you sure you want to remove flight ID: ${item.id}, from: ${item.origin}, to: ${item.destination}?`)) {
      api.removeFlight(item.id, (err) => {
        if (err) {
          log.err(`removing err: ${JSON.stringify(err)}`);
          alert('Removing flight error!');
        } else {
          this.updateFlights();
        }
      });
    }
  }

  onAddFlightClick(e) {
    if (e) e.preventDefault();
    this.setState({ editFlightDialog: {
      key: utils.id.genId(),
      open: true,
      item: null,
    } });
  }

  onEditFlightDialogClose(e) {
    this.setState(prev => ({ editFlightDialog: {
      key: prev.editFlightDialog.key,
      open: false,
    } }));
    this.updateFlights();
  }

    // Render

  render() {
    const {
            items,
            editFlightDialog,
        } = this.state;

    return (
      <div>
        <div style={compStyle.topPanel}>
          <div>
            <h1>Flights</h1>
          </div>
          <div>
            <IconButton
              tooltip="Add flight"
              iconClassName="fa fa-plus"
              onTouchTap={e => this.onAddFlightClick(e)}
            />
          </div>
        </div>
        <FligtsList
          items={items}
          onEditClick={(e, item) => this.onEditClick(e, item)}
          onRemoveClick={(e, item) => this.onRemoveClick(e, item)}
        />
        <EditFlightDialog
          key={editFlightDialog.key}
          open={editFlightDialog.open}
          item={editFlightDialog.item}
          onClose={e => this.onEditFlightDialogClose(e)}
        />
      </div>
    );
  }
}

FlightsPage.propTypes = propTypes;
FlightsPage.defaultProps = defaultProps;

export default FlightsPage;
