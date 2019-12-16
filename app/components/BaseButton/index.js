import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, ButtonBase } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: props => {
      if (props.color === 'grey') return theme.palette.grey['500'];
      if (props.color === 'orange') return '#FFA142';
      return '#eee';
    },
    borderRadius: '30px',
    height: props => props.height,
    width: props => props.width,
    fontSize: '26px',
    color: props => theme.palette.common[props.textColor],
  },
}));

export default function BaseButton(props) {
  const classes = useStyles(props);

  return (
    <ButtonBase className={classes.root} onClick={() => props.onClick()}>
      {props.value}
    </ButtonBase>
  );
}

BaseButton.defaultProps = {
  onClick: () => {},
  color: 'orange',
  height: '60px',
  width: '60px',
  textColor: 'white',
};

BaseButton.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['orange', 'grey', 'lightGrey']),
  height: PropTypes.string,
  width: PropTypes.string,
  textColor: PropTypes.oneOf(['white', 'black']),
};
