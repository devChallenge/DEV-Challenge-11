// React
import React from 'react';
import PropTypes from 'prop-types';
// Core
import * as api from 'core/api';
// Helpers
import Log from 'helpers/log';
import utils from 'helpers/utils';
// Log
const log = Log.withModule('searchPage');

// PropTypes
const propTypes = {
  id: PropTypes.any.isRequired,
};

// DefaultProps
const defaultProps = {
  
};

// Style
const compStyle = {
    
}

// FlightInfo
class FlightInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item: null,
        }
    }

    // Lifecycle hooks

    componentDidMount(){
        api.getFlightById(this.props.id, (err, items) => {
            console.log(JSON.stringify(items));
            if(err){
                return log.err(err);
            }
            if(items && items.length){
                const item = items[0];
                this.setState({item});
            }
        });
    }

    componentWillUnmount(){
        
    }

    // Render

    render(){
        const {id} = this.props;
        const {item} = this.state;
        return (
            <div style={{marginTop: '10px'}}> 
                {item ? (
                    <div>
                        <div>
                            <strong>From: </strong> <span>{item.origin}</span>
                        </div>
                        <div>
                            <strong>To: </strong> <span>{item.destination}</span>
                        </div>
                    </div>
                ) : (
                    <span>Loading...</span>
                )}
            </div>
        );
    }
}

FlightInfo.propTypes = propTypes;
FlightInfo.defaultProps = defaultProps;

export default FlightInfo;
