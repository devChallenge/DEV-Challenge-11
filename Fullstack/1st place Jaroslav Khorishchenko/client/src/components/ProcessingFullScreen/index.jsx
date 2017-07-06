// React
import React from 'react';
import PropTypes from 'prop-types';

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
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  iconWrap: {
    fontSize: '36px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
};

// ProcessingFullScreen
function ProcessingFullScreen() {
  return (
    <div style={compStyle.container}>
      <div style={compStyle.iconWrap}>
        <span className="fa fa-spin fa-refresh" />
      </div>
    </div>
  );
}

ProcessingFullScreen.propTypes = propTypes;
ProcessingFullScreen.defaultProps = defaultProps;

export default ProcessingFullScreen;
