import React, { useState } from 'react';
import { makeStyles, Input } from '@material-ui/core';
import BaseButton from 'components/BaseButton/Loadable';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#334051',
    height: '650px',
    width: '350px',
    borderRadius: '5px',
    padding: theme.spacing(2),
  },
  history: {
    width: '100%',
    height: '100px',
    backgroundColor: theme.palette.grey['400'],
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    fontSize: '25px',
    color: 'white',
  },
  input: {
    width: '100%',
    height: '100px',
    backgroundColor: theme.palette.grey['400'],
    textAlign: 'right',
    padding: theme.spacing(1),
  },
  inputClass: {
    textAlign: 'right',
    textShadow: '0 0 0 #fff',
    fontSize: '45px',
    color: 'transparent',
  },
  buttonsContainer: {
    marginTop: theme.spacing(2),
    width: '100%',
    heigth: 'calc(100% -216pxpx)',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonRow: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export default function Calculator(props) {
  const classes = useStyles(props);
  const [currentValue, setCurrentValue] = useState('0');
  const [mem, setMem] = useState({
    value: '',
    operator: '',
  });

  function handleChange(originalValue) {
    let value = originalValue;
    if (originalValue === 'Enter') {
      value = '=';
    }
    if (value.match(/^[0-9]*$/g)) {
      handleNumeric(value);
      return;
    }
    if (value.match(/[/*\-+=]|sqrt/g)) {
      handleOperator(value);
      return;
    }
    if (value === '.' && !currentValue.includes('.')) {
      setCurrentValue(`${currentValue}${value}`);
      return;
    }
    if (value === 'del') {
      if (currentValue.length === 1) {
        setCurrentValue('0');
      } else {
        setCurrentValue(currentValue.slice(0, -1));
      }
      return;
    }
    if (value === 'c') {
      setCurrentValue('0');
      setMem({ value: '', operator: '' });
    }
  }

  function handleNumeric(value) {
    if (currentValue.length === 1 && currentValue === '0') {
      setCurrentValue(value);
      return;
    }
    setCurrentValue(`${currentValue}${value}`);
  }

  function handleOperator(value) {
    if (mem.value && mem.operator !== value) {
      handleOperator(mem.operator);
    }
    if (mem.value && value === '=') {
      setMem({
        operator: '',
        value: '',
      });
      setCurrentValue(
        // eslint-disable-next-line no-eval
        eval(`${mem.value} ${mem.operator} ${currentValue}`).toString(),
      );
      return;
    }
    if (!mem.value && value === '=') return;
    if (value === 'sqrt') {
      setCurrentValue(
        Math.sqrt(parseFloat(currentValue))
          .toFixed(3)
          .toString(),
      );
      return;
    }
    setMem({
      operator: value,
      // eslint-disable-next-line no-eval
      value: eval(`${mem.value} ${mem.operator} ${currentValue}`).toString(),
    });
    setCurrentValue('0');
  }

  function handleKeyPress(event) {
    console.log(`Executing handleKeyPress: ${event.key}`);
    handleChange(event.key);
  }

  return (
    <div className={classes.root}>
      <div className={classes.history}>
        {mem.value}&nbsp;{mem.operator}
      </div>
      <Input
        disableUnderline
        className={classes.input}
        inputProps={{ style: { height: '100%' } }}
        classes={{
          input: classes.inputClass,
        }}
        onKeyDown={handleKeyPress}
        value={currentValue}
      />
      <div className={classes.buttonsContainer}>
        <div className={classes.buttonRow}>
          <BaseButton
            color="lightGrey"
            value="C"
            onClick={() => handleChange('c')}
            textColor="black"
          />
          <BaseButton
            color="lightGrey"
            value="sqrt"
            onClick={() => handleChange('sqrt')}
            textColor="black"
          />
          <BaseButton
            color="lightGrey"
            value="del"
            onClick={() => handleChange('del')}
            textColor="black"
          />
          <BaseButton value="/" onClick={() => handleChange('/')} />
        </div>
        <div className={classes.buttonRow}>
          <BaseButton
            color="grey"
            value="7"
            onClick={() => handleChange('7')}
            textColor="black"
          />
          <BaseButton
            color="grey"
            value="8"
            onClick={() => handleChange('8')}
            textColor="black"
          />
          <BaseButton
            color="grey"
            value="9"
            onClick={() => handleChange('9')}
            textColor="black"
          />
          <BaseButton value="*" onClick={() => handleChange('*')} />
        </div>
        <div className={classes.buttonRow}>
          <BaseButton
            color="grey"
            value="4"
            onClick={() => handleChange('4')}
            textColor="black"
          />
          <BaseButton
            color="grey"
            value="5"
            onClick={() => handleChange('5')}
            textColor="black"
          />
          <BaseButton
            color="grey"
            value="6"
            onClick={() => handleChange('6')}
            textColor="black"
          />
          <BaseButton value="-" onClick={() => handleChange('-')} />
        </div>
        <div className={classes.buttonRow}>
          <BaseButton
            color="grey"
            value="1"
            onClick={() => handleChange('1')}
            textColor="black"
          />
          <BaseButton
            color="grey"
            value="2"
            onClick={() => handleChange('2')}
            textColor="black"
          />
          <BaseButton
            color="grey"
            value="3"
            onClick={() => handleChange('3')}
            textColor="black"
          />
          <BaseButton value="+" onClick={() => handleChange('+')} />
        </div>
        <div className={classes.buttonRow}>
          <BaseButton
            color="grey"
            value="0"
            onClick={() => handleChange('0')}
            width="135px"
            textColor="black"
          />
          <BaseButton
            color="grey"
            value="."
            onClick={() => handleChange('.')}
            textColor="black"
          />
          <BaseButton
            color="grey"
            value="="
            onClick={() => handleChange('=')}
            textColor="black"
          />
        </div>
      </div>
    </div>
  );
}
