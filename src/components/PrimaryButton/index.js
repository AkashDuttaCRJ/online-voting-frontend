import { LoadingButton } from "@mui/lab"

const PrimaryButton = ({ title, onClick, disabled = false, loading = false }) => {
  return (
  <LoadingButton 
    variant="contained" 
    size="large" 
    disableElevation 
    disabled={disabled}
    loading={loading}
    sx={{ width: '200px', marginBlock: '20px' }}
    onClick={onClick}
  >
    {title}
  </LoadingButton>
  )
}

export default PrimaryButton