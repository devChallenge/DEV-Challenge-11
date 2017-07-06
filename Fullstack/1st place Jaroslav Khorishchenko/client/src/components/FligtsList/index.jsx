// React
import React from 'react';
import PropTypes from 'prop-types';
// Utils
import _ from 'lodash';
// Components
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

// PropTypes
const propTypes = {
  items: PropTypes.array.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
};

// DefaultProps
const defaultProps = {

};

// Style
const compStyle = {
  smallIcon: {
    width: 36,
    height: 36,
    fontSize: '16px',
    position: 'relative',
    left: '-8px',
  },
  small: {
    width: 42,
    height: 42,
  },
  textLeft: {
    textAlign: 'left',
  },
};

// FligtsList
class FligtsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    // Lifecycle hooks

  componentDidMount() {

  }

  componentWillUnmount() {

  }

    // Render

  render() {
    const {
        items,
        onEditClick,
        onRemoveClick,
    } = this.props;
    return (
      <Table
        allRowsSelected={false}
        selectable={false}
      >
        <TableHeader
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Origin</TableHeaderColumn>
            <TableHeaderColumn>Destination</TableHeaderColumn>
            <TableHeaderColumn>Start</TableHeaderColumn>
            <TableHeaderColumn>Duration</TableHeaderColumn>
            <TableHeaderColumn>Cost</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {_.map(items, item => (
            <TableRow key={item.id}>
              <TableRowColumn style={compStyle.textLeft}>{item.id}</TableRowColumn>
              <TableRowColumn>{item.origin}</TableRowColumn>
              <TableRowColumn>{item.destination}</TableRowColumn>
              <TableRowColumn>{item.start}</TableRowColumn>
              <TableRowColumn>{item.duration}</TableRowColumn>
              <TableRowColumn>{`$${item.cost}`}</TableRowColumn>
              <TableRowColumn>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <IconButton
                    iconClassName="fa fa-pencil"
                    iconStyle={compStyle.smallIcon}
                    style={compStyle.small}
                    onTouchTap={e => onEditClick(e, item)}
                  />
                  <IconButton
                    iconClassName="fa fa-trash"
                    iconStyle={compStyle.smallIcon}
                    style={compStyle.small}
                    onTouchTap={e => onRemoveClick(e, item)}
                  />
                </div>
              </TableRowColumn>
            </TableRow>
                    ))}
        </TableBody>
      </Table>
    );
  }
}

FligtsList.propTypes = propTypes;
FligtsList.defaultProps = defaultProps;

export default FligtsList;
