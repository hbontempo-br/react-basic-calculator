/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import Calculator from 'components/Calculator/Loadable';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function HomePage(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Calculator />
    </div>
  );
}
