import React from 'react';
import { useState, useEffect } from 'react';
import { TextField, InputAdornment, FormLabel } from '@mui/material';

const GenericInputField = (props) => {
  const {
    onChange,
    label,
    formLabel,
    defaultValue,
    variant = 'outlined',
    size = 'small',
    multiline = false,
    maxRows = 4,
    includeHttpAdornment = false,
    showFormLabel = false,
    value,
    error,
    ...rest // Rest of the props
  } = props
  const [selectedValue, setSelectedValue] = useState(value);


  return (
    <div>
      {showFormLabel && (
        <FormLabel style={{ color: 'black', fontSize: '14px' }}>
          {formLabel}
        </FormLabel>
      )}
      <TextField
        id="outlined-basic"
        // label={formLabel}
        value={selectedValue}
        placeholder={label} // Use label prop as the field placeholder
        variant={variant}
        fullWidth
        size={size}
        multiline={multiline}
        maxRows={maxRows}
        style={{
          width: '100%',
          backgroundColor: 'white',
        }}
        onChange={(event) => {
          onChange(event.target.value)
          setSelectedValue(event.target.value);
        }}
        InputProps={includeHttpAdornment && {
          startAdornment: (
            <InputAdornment position="start">https://</InputAdornment>
          ),
        }}
        error={!!error} // Set error state based on the presence of an error message
        helperText={error ? error : null} // Display the error message or a space to preserve layout
      />
    </div>
  );
}

export default GenericInputField;

