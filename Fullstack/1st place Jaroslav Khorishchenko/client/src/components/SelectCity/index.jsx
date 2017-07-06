// React
import React from 'react';
import PropTypes from 'prop-types';
// Components
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// Utils
import _ from 'lodash';
// Consts
import cities from 'consts/cities';
const citiesArr = _.map(cities, (val, key) => ({val, title: key}));

// PropTypes
const propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

// DefaultProps
const defaultProps = {
  value: null,
};

// Style
const compStyle = {

};


// SelectCity
function SelectCity(props) {
  const {
        value,
        onChange,
        ...otherProps
    } = props;
  return (
    <SelectField
      value={value}
      onChange={(e, index, val) => onChange(e, val)}
      {...otherProps}
    >
      {_.map(citiesArr, (item, key) => (
        <MenuItem 
          key={key}
          value={item.val} 
          primaryText={item.title}
        />
      ))}
    </SelectField>
  );
}

SelectCity.propTypes = propTypes;
SelectCity.defaultProps = defaultProps;

export default SelectCity;
