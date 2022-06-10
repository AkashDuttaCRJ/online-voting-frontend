import { Button } from '@mui/material'

const SecondaryButton = ({ title, onClick, disabled = false }) => {
  return <Button variant="text" size="medium" disableElevation onClick={onClick} disabled={disabled}>{title}</Button>
}

export default SecondaryButton