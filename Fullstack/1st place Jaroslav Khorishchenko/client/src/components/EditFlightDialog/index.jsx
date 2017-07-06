// React
import React from 'react';
import PropTypes from 'prop-types';
// Components
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectCity from 'components/SelectCity';
// Helpers
import Log from 'helpers/log';
// API
import * as api from 'core/api';
// Log
const log = Log.withModule('signInDialog');

// PropTypes
const propTypes = {
  item: PropTypes.any,
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
    maxWidth: '600px',
  },
  row: {

  },
};

// EditFlightDialog
class EditFlightDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'add',
      item: {
        id: 0,
        origin: '',
        destination: '',
        start: '10:00',
        duration: 60,
        cost: 100,
      },
    };
  }

    // Lifecycle hooks

  componentDidMount() {
    if (this.props.item) {
      log('edit mode');
      this.setState({ mode: 'edit', item: this.props.item });
    } else {
      log('add mode');
      this.setState({ mode: 'add' });
    }
  }

  componentWillUnmount() {

  }

    // Functions

  editItem() {
    const { onClose } = this.props;
    const { item } = this.state;
    if (!this.checkItemData()) return;
    const {id, ...data} = item;
    api.editFlight(id, data, (err, data) => {
      if (err) {
        log.err(`item edit err: ${JSON.stringify(err)}`);
        alert('Flight edit error!');
      } else {
        onClose(null, true);
      }
    });
  }

  createItem() {
    const { onClose } = this.props;
    const { item } = this.state;
    if (!this.checkItemData()) return;
    api.addFlight(item, (err, data) => {
      if (err && err.descr && (err.descr === 'flight with id exists')) {
        return alert(`Flight with ID: ${item.id} exists!`);
      }
      if (err) {
        log.err(`item edit err: ${JSON.stringify(err)}`);
        alert('Flight creation error!');
      } else {
        onClose(null, true);
      }
    });
  }

  checkItemData() {
    const { item } = this.state;
    if (!item.id) {
      alert('ID required!');
      return false;
    }
    if (!item.origin) {
      alert('Origin required!');
      return false;
    }
    if (!item.destination) {
      alert('Destination required!');
      return false;
    }
    if (!item.start) {
      alert('Destination required!');
      return false;
    }
    if (!item.duration) {
      alert('Duration required!');
      return false;
    }
    if (!item.cost) {
      alert('Cost required!');
      return false;
    }
    if (item.id <= 0) {
      alert('ID have to be more than 0');
      return false;
    }
    if (item.duration <= 0) {
      alert('Duration have to be more than 0');
      return false;
    }
    if (item.cost <= 0) {
      alert('Cost have to be more than 0');
      return false;
    }
    return true;
  }

    // Events

  onItemIdChage(e, val) {
    const { item } = this.state;
    item.id = val;
    this.setState({ item });
  }

  onItemOriginChange(e, val) {
    const { item } = this.state;
    item.origin = val;
    this.setState({ item });
  }

  onItemDestinationChange(e, val) {
    const { item } = this.state;
    item.destination = val;
    this.setState({ item });
  }

  onItemStartChange(e, val) {
    const { item } = this.state;
    item.start = val;
    this.setState({ item });
  }

  onItemDurationChange(e, val) {
    const { item } = this.state;
    item.duration = val;
    this.setState({ item });
  }

  onItemCostChange(e, val) {
    const { item } = this.state;
    item.cost = val;
    this.setState({ item });
  }

  onEditCreateClick(e) {
    const { onClose } = this.props;
    const { mode } = this.state;
    if (mode == 'edit') this.editItem();
    else this.createItem();
  }

    // Render

  render() {
    const {
            open,
            onClose,
        } = this.props;

    const {
            mode,
            item,
        } = this.state;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={e => onClose(e)}
      />,
      <FlatButton
        label={mode == 'edit' ? 'Save' : 'Add'}
        primary={false}
        onTouchTap={e => this.onEditCreateClick(e)}
      />,
    ];

    return (
      <Dialog
        open={open}
        title={mode == 'edit' ? 'Edit' : 'Add'}
        actions={actions}
        modal
        contentStyle={compStyle.container}
        onRequestClose={e => onClose(e, false)}
      >
        <div style={compStyle.row}>
          <TextField
            type="number"
            min="0"
            fullWidth
            hintText="1234"
            floatingLabelText="ID"
            value={item.id}
            onChange={(e, val) => this.onItemIdChage(e, val)}
          />
        </div>
        <div style={compStyle.row}>
          <SelectCity
            fullWidth
            hintText="kiyv"
            floatingLabelText="Origin"
            value={item.origin}
            onChange={(e, val) => this.onItemOriginChange(e, val)}
          />
        </div>
        <div style={compStyle.row}>
          <SelectCity
            fullWidth
            hintText="kiyv"
            floatingLabelText="Destination"
            value={item.destination}
            onChange={(e, val) => this.onItemDestinationChange(e, val)}
          />
        </div>
        <div style={compStyle.row}>
          <TextField
            fullWidth
            hintText="10:00"
            floatingLabelText="Start"
            value={item.start}
            onChange={(e, val) => this.onItemStartChange(e, val)}
          />
        </div>
        <div style={compStyle.row}>
          <TextField
            type="number"
            min="0"
            fullWidth
            hintText="60"
            floatingLabelText="Duration (min)"
            value={item.duration}
            onChange={(e, val) => this.onItemDurationChange(e, val)}
          />
        </div>
        <div style={compStyle.row}>
          <TextField
            type="number"
            min="0"
            fullWidth
            hintText="100"
            floatingLabelText="Cost (USD)"
            value={item.cost}
            onChange={(e, val) => this.onItemCostChange(e, val)}
          />
        </div>
      </Dialog>
    );
  }
}

EditFlightDialog.propTypes = propTypes;
EditFlightDialog.defaultProps = defaultProps;

export default EditFlightDialog;
