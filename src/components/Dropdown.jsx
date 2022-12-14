import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
	'& label.Mui-focused': {
	  color: '#22c55E',
	},
	'& .MuiOutlinedInput-root': {
	  '& fieldset': {
		borderColor: '#7DDBDE',
	  },
	  '&.Mui-focused fieldset': {
		borderColor: '#E1E1E1',
	  },
	},
});

/**
 * details page countries dropdown
 * @param {array} options countries code array 
 * @param {object} countrySelected country code and name for the country selected 
 * @param {() => void} handleChange country code and name for the country selected   
 */

const Dropdown = ({ options, countrySelected, handleChange }) => {
	
	const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
    );

	const defaultValues = () => {
		const value = countrySelected.value;
		const label = regionNames.of(countrySelected.value);
		return {value, label}
	}

	return (
		<Autocomplete
			sx={{ width: 200 }}
			size={"small"}
			color={"white"}
			options={options}
			autoHighlight
			onChange={(event, value) => {handleChange(value.value)}} 
			value={defaultValues()}
			getOptionLabel={(option) => regionNames.of(option.value) || ""}
			disableClearable
			isOptionEqualToValue={(option, value) => option.value === value.value}
			renderOption={(props, option) => (
				<Box component="li" sx={{ '& > img': { mr: 2 }}} {...props}>
					<img
						loading="lazy"
						width="20"
						src={`https://flagcdn.com/w20/${option.value.toLowerCase()}.png`}
						alt=""
					/>
					{regionNames.of(option.value)}
				</Box>
			)}
			renderInput={(params) => (
				<CssTextField
					{...params}
					label="Choose a country"
					InputLabelProps={{style : {color : '#7DDBDE'} }}
					inputProps={{
						...params.inputProps,
						style:{color: 'white', fontSize: 14, focusColor: 'pink'}
					}}
				/>
			)}
		/>	
	);
};

export default Dropdown;
