import React from 'react'

import TextField from '@material-ui/core/TextField'

import * as NumberFormat from 'react-number-format'

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      thousandSeparator='.'
      decimalSeparator=','
      onValueChange={(values) => {
        if (!onChange) return
        onChange({
          target: {
            value: Math.abs(values.value),
            name: props.name,
          },
        });
      }}
      prefix='$'
      decimalScale={4}
      isNumericString
    />
  )
}

const PriceField = props => (
  <TextField
    label={props.label}
    margin='normal'
    fullWidth
    InputProps={{inputComponent: NumberFormatCustom}}
    onChange={props.onChange}
    value={props.value}

    {...props.TextFieldProps}
  />
)

export default PriceField
