import { ExitToApp, Person } from '@mui/icons-material';
import { AppBar, Avatar, CircularProgress, Divider, Grid, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeCard from '../../components/HomeCard';

const HomePage = () => {
  const navigate = useNavigate();
    const [response, setResponse] = useState([])
    const [fullName, setFullName] = useState('')
    const [userId, setUserId] = useState('')
    const [reset, setReset] = useState(false)
    const [token, setToken] = useState('')

    useEffect(() => {
        const tempToken = localStorage.getItem('token');
        if (!tempToken) {
            navigate('/login', { replace: true });
            return
        }
        setToken(tempToken)
        const tempUserData = JSON.parse(localStorage.getItem('data'));
        setFullName(tempUserData[0].fullName)
        setUserId(tempUserData[0].id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        token && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token])

    useEffect(() => {
        reset && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[reset])

    const getData = async () => {
        const resp = await fetch(`https://instavote-be.herokuapp.com/?userId=${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await resp.json();
        setResponse(data);
        setReset(false);
    }

    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }

    function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }

    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('data');
        navigate('/login', { replace: true });
    }

    console.log(response, userId);
      
    return (
    <div>
        <AppBar position="sticky">
            <Toolbar variant="regular" sx={{ justifyContent: 'space-between'}}>
                <Typography variant="h5" color="inherit" component="div">
                    InstaVote
                </Typography>
                <div>
                    <Tooltip title={fullName}>
                        <IconButton edge="end" color="inherit" aria-label="account" sx={{ marginRight: '10px' }}>
                            {fullName === '' ? <Person /> :<Avatar {...stringAvatar(fullName)} />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Logout">
                        <IconButton color="inherit" aria-label="logout" component="span" onClick={logoutUser}>
                            <ExitToApp />
                        </IconButton>
                    </Tooltip>
                </div>
            </Toolbar>
        </AppBar>
        <Stack padding={3}>
            {response.length === 0 &&
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px'}}>
                <CircularProgress />
            </div>}
            {response.length !== 0 && response.map((item, index) => (
                <div key={index}>
                <Typography variant="h4" gutterBottom component="div">
                    {item.title}
                </Typography>
                <Divider />
                <Grid container spacing={3} padding={2} marginBottom={4}>
                    {item.data.map((vote, index) => (
                        <Grid item key={vote.id}>
                            <HomeCard title={vote.title} id={vote.id} type={item.title.toLowerCase()} start={vote.startDate} end={vote.endDate} setReset={setReset} isVoted={vote.isCompleted ? vote.isCompleted : false} />
                        </Grid>
                    ))}
                </Grid>
                </div>
            ))}
        </Stack>
    </div>
  )
}

export default HomePage