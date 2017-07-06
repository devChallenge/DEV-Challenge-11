// React
import React from 'react';
import PropTypes from 'prop-types';
// Components
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlightInfo from 'components/FlightInfo';

// PropTypes
const propTypes = {
  items: PropTypes.array.isRequired,
};

// DefaultProps
const defaultProps = {
  
};

// Style
const compStyle = {
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: '1px solid #ccc',
        alignItems: 'center',
    }
}

// TripsList
class TripsList extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    // Lifecycle hooks

    componentDidMount(){
        
    }

    componentWillUnmount(){
        
    }

    // Render

    render(){
        const {items} = this.props;
        return (
            <div> 
                {_.map(items, (item, key) => (
                    <div style={compStyle.itemContainer} key={key}>
                        <div style={{flex: '1'}}>
                            {_.map(item.flights, (id, key) => (
                                <FlightInfo
                                    key={key}
                                    id={id}
                                />
                            ))}
                        </div>
                        <div style={{width: '160px'}}>
                            <div><strong>Connections: </strong></div>
                            <div><span>{item.connections + ' min.'}</span></div>
                        </div>
                        <div style={{width: '160px'}}>
                            <div><strong>Time: </strong></div>
                            <div><span>{item.time + ' min.'}</span></div>
                        </div>
                        <div style={{width: '160px'}}>
                            <div><strong>Price: </strong></div>
                            <div><span>{'$' + item.price}</span></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

TripsList.propTypes = propTypes;
TripsList.defaultProps = defaultProps;

export default TripsList;
