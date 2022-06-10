import { FormControl, FormHelperText, InputLabel, OutlinedInput } from "@mui/material"

const InputBlock = ({ label, type, value, setValue, disabled = false, autofocus = false, startAdornment = false, required = false, error = false }) => {
  return (
    <FormControl error={error && true} sx={{ width: '450px', marginBlock: '15px' }}>
      <InputLabel htmlFor="component-outlined">{label}</InputLabel>
      <OutlinedInput
        id="component-outlined"
        type={type}
        disabled={disabled}
        required={required}
        autoFocus={autofocus}
        startAdornment={startAdornment}
        value={value}
        label={label}
        onChange={(e) => setValue(e.target.value)}
        aria-describedby="component-error-text"
      />
      {error && <FormHelperText id="component-error-text">{error}</FormHelperText>}
    </FormControl>
  )
}

export default InputBlock