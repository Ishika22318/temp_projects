import React, { useState } from 'react';
import { TextareaAutosize, FormLabel } from '@mui/material';

const GenericTextAreaField = (props) => {
  const { item, value, onChange } = props;
  const { label, name, rules } = item;
  const [error, setError] = useState("");

  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    // Validate the input based on the rules
    if (rules) {
      if (rules.required && !event.target.value) {
        setError(rules.required);
      } else if (rules.minLength && event.target.value.length < rules.minLength.value) {
        setError(rules.minLength.message);
      } else if (rules.maxLength && event.target.value.length > rules.maxLength.value) {
        setError(rules.maxLength.message);
      } else {
        setError(""); // No validation error
      }
    }

    onChange(event.target.value, name);
  };

  return (
    <div>
      <div>
        <FormLabel id={`textarea-label-${name}`}>{label}</FormLabel>
      </div>
      <div>
        <TextareaAutosize
          id={`textarea-${name}`}
          value={selectedValue}
          aria-label={label}
          placeholder={label}
          minRows={4}
          style={{
            width: '100%',
            backgroundColor: 'white',
            border: error ? '1px solid red' : '1px solid black',
          }}
          onChange={handleChange}
        />
        {error && (
          <p style={{ paddingLeft: '10px', color: '#d32f2f', fontSize: '0.75rem', fontFamily: '"Roboto","Helvetica","Arial","sans-serif"' }}>{error}</p>
        )}
      </div>
    </div>
  );
};

export default GenericTextAreaField;
