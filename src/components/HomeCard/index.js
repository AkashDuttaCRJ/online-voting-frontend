import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const HomeCard = ({ type = 'previous', title, id }) => {
    const navigate = useNavigate()

  return (
    <Card sx={{ width: 275 }}>
        <CardContent>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="red">
            Expired
            </Typography>
        </CardContent>
        <CardActions>
            {type === 'previous' ? <Button onClick={() => navigate('/details')}>Check Results</Button> : type === 'ongoing' ? <Button variant="contained" color="primary" onClick={() => navigate('/details')}>View</Button> : <Button variant="outlined" color="primary">Notify Me</Button>}
        </CardActions>
    </Card>
  )
}

export default HomeCard