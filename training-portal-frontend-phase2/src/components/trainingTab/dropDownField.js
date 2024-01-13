import { useState } from 'react';
import { FormControl, Select, MenuItem, FormLabel } from '@mui/material';

const DropDownField = (props) => {
  const { item, value, onChange } = props;

  const handleChange = (event) => {
    onChange(event.target.value, item.name);
    setSelectedValue(event.target.value);
  };

  const [selectedValue, setSelectedValue] = useState(value);

  return (
    <div>
      <div>
        <FormLabel id={`dropdown-label-${item.name}`}>{item.label}</FormLabel>
      </div>
      <div>
        <FormControl>
          <Select
            sx={{ width: "467px", height: "40px" }}
            labelId={`dropdown-label-${item.name}`}
            id={`dropdown-${item.name}`}
            value={selectedValue}
            onChange={handleChange}
          >
            {item.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default DropDownField;