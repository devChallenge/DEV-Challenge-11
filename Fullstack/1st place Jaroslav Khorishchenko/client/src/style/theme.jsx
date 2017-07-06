// React
import React from 'react';
import PropTypes from 'prop-types';
// Theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import colors from './colors';

// Custom theme
const customTheme = {
  palette: {
    primary1Color: colors.primary1Color,
    primary2Color: colors.primary2Color,
    primary3Color: colors.primary3Color,
    accent1Color: colors.accent1Color,
    accent2Color: colors.accent2Color,
    accent3Color: colors.accent3Color,
    textColor: colors.textColor,
    secondaryTextColor: colors.secondaryTextColor,
    alternateTextColor: colors.alternateTextColor,
    canvasColor: colors.canvasColor,
    borderColor: colors.borderColor,
    disabledColor: colors.disabledColor,
    pickerHeaderColor: colors.pickerHeaderColor,
    clockCircleColor: colors.clockCircleColor,
  },
};

// PropTypes
const propTypes = {
  children: PropTypes.any,
};

// DefaultProps
const defaultProps = {
  children: null,
};

// AppTheme
function AppTheme(props) {
  const { children } = props;
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
      {children}
    </MuiThemeProvider>
  );
}

AppTheme.propTypes = propTypes;
AppTheme.defaultProps = defaultProps;

export default AppTheme;
