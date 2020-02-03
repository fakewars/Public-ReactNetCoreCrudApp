import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function OptionRadio(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = event => {
    setValue(parseInt(event.target.value));
    props.onChange(props.identifier, event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
        {
          props.options.map((option, index) => (
            <FormControlLabel
              control={<Radio color="primary" />}
              labelPlacement="bottom"
              key={index}
              value={option.score}
              label={option.score}
            />
          ))
        }
      </RadioGroup>
    </FormControl>
  );
}