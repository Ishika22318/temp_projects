import * as React from 'react';
import { useState, } from 'react';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import { Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: "#D9DAE4",
        margin: '6px',
        padding: '16px'
    },
    headline: {
        color: "#0D4896",
        fontSize: '20px'
    },
    button: {
        color: "#0D4896 !important"
    }
}));

const RadioField = (props) => {
    const location = useLocation();
    const { value, item, onChange } = props
    const [selectedValue, setSelectedValue] = useState(value);

    const handleChange = (event) => {
        onChange(event.target.value, item.name)
        setSelectedValue(event.target.value);
    };

    return (
        <div>
            <FormLabel id="demo-controlled-radio-buttons-group">{item.label}</FormLabel>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={selectedValue}
                onChange={handleChange}
            >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel value={true} control={<Radio />} label="Active" />
                    <FormControlLabel value={false} control={<Radio />} label="Disabled" />
                </div>
            </RadioGroup>
        </div>
    )
}

export default RadioField;