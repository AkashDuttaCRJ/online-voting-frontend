import { AccessTime, ErrorOutline, InfoOutlined } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomeCard = ({ type, title, start, end, id, setReset }) => {
  const [time, setTime] = useState(null)
  var diff = null
    const navigate = useNavigate()

    useEffect(() => {
      const formatTime = (time) => {
        if (time > 86400) {
          return `${Math.floor(time / 86400)}d ${Math.floor((time % 86400) / 3600)}h`
        } else if (time > 3600) {
          return `${Math.floor(time / 3600)}h ${Math.floor((time % 3600) / 60)}m`
        } else if (time > 60) {
          return `${Math.floor(time / 60)}m ${time % 60}s`
        } else {  
          return `${time}s`
        }
      }

      const getTime = setInterval(() => {
        if(type === 'ongoing') {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          diff = moment(end).diff(moment(), 'seconds')
        } 
        if (type === 'upcoming') {
          diff = moment(start).diff(moment(), 'seconds')
        }
        setTime(diff >= 0 ? formatTime(diff) : '0s')
      }, 1000)

      return () => {
        clearInterval(getTime)
      }
    },[])

    useEffect(() => {
      if(time === '0s') {
        setTimeout(() => {
          setReset(true)
        }, 2000)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time])

  return (
    <Card sx={{ width: 275 }}>
        <CardContent>
            <Typography variant="h5" component="div" marginBottom={1.2}>
              {title}
            </Typography>
            {type === 'ongoing' && <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center'}}>
              <span style={{ marginRight: '5px' }}><AccessTime /></span>Ends In: {time ? time : '-- --'}
            </Typography>}
            {type === 'upcoming' && <Typography variant="body2" color="green" sx={{ display: 'flex', alignItems: 'center'}}>
            <span style={{ marginRight: '5px' }}><InfoOutlined /></span>Starts In: {time ? time : '-- --'}
            </Typography>}
            {type === 'previous' && <Typography variant="body2" color="red" sx={{ display: 'flex', alignItems: 'center'}}>
            <span style={{ marginRight: '5px' }}><ErrorOutline /></span>Expired
            </Typography>}
        </CardContent>
        <CardActions>
            {type === 'previous' ? <Button onClick={() => navigate(`/details/${id}`)}>Check Results</Button> : type === 'ongoing' ? <Button variant="contained" color="primary" onClick={() => navigate(`/details/${id}`)}>View</Button> : null}
        </CardActions>
    </Card>
  )
}

export default HomeCard