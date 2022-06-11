import { ExitToApp } from '@mui/icons-material';
import { AppBar, Avatar, CircularProgress, Divider, Grid, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import HomeCard from '../../components/HomeCard';

const HomePage = () => {
    const [response, setResponse] = useState([])

    useEffect(() => {
        const getData = async () => {
            const resp = await fetch('http://localhost:5000/');
            const data = await resp.json();
            setResponse(data);
        }
        getData();
    },[])

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

      console.log(response);
      
    return (
    <div>
        <AppBar position="sticky">
            <Toolbar variant="regular" sx={{ justifyContent: 'space-between'}}>
                <Typography variant="h5" color="inherit" component="div">
                    InstaVote
                </Typography>
                <div>
                    <IconButton edge="end" color="inherit" aria-label="account" sx={{ marginRight: '10px' }}>
                        <Avatar {...stringAvatar('John Doe')} />
                    </IconButton>
                    <Tooltip title="Logout">
                        <IconButton color="inherit" aria-label="logout" component="span">
                            <ExitToApp />
                        </IconButton>
                    </Tooltip>
                </div>
            </Toolbar>
        </AppBar>
        {response === [] ? <CircularProgress /> : <Stack padding={3}>
            {response.map((item, index) => (
                <div key={index}>
                <Typography variant="h4" gutterBottom component="div">
                    {item.title}
                </Typography>
                <Divider />
                <Grid container spacing={3} padding={2} marginBottom={4}>
                    {item.data.map((vote, index) => (
                        <Grid item key={vote.id}>
                            <HomeCard title={vote.title} id={vote.id} type={item.title.toLowerCase()} start={vote.startDate} end={vote.endDate} />
                        </Grid>
                    ))}
                </Grid>
                </div>
            ))}
        </Stack>}
    </div>
  )
}

export default HomePage