
import { ArrowBack } from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, CircularProgress, FormControl, FormControlLabel, IconButton, LinearProgress, Radio, RadioGroup, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const DetailsPage = () => {
    const [completed, setCompleted] = useState(false)
    const [data, setData] = useState(null)
    const [candidateId, setcandidateId] = useState(null)
    const navigate = useNavigate()
    const params = useParams()
    const voteId = params.id

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`http://localhost:5000/getvotedata?voteId=${voteId}&completed=${completed}`)
            const resp = await response.json()
            setData(resp)
        }
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(candidateId);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10rem' }}>
        <Card sx={{ width: '60%' }}>
            <CardContent>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" component="div" marginLeft={1.5} marginTop={2} textAlign={!data && 'center'}>
                {data ? data.title : <CircularProgress />}
                </Typography>
                {completed ? <Stack paddingLeft={4} paddingRight={4} marginTop={1}>
                    {data && data?.candidates.map((candidate, index) => (
                        <div style={{ marginBottom: '20px'}} key={index}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            {candidate.name}
                            <Typography variant="body2" color="text.secondary" marginTop={2}>
                            {candidate.no_of_votes} Votes
                            </Typography>
                        </div>
                        <LinearProgress variant="determinate" value={candidate.votes_perc} sx={{ marginTop: '10px'}} />
                    </div>
                    ))}
                </Stack> : 
                <FormControl sx={{ marginLeft: '35px'}}>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    // value={}
                    onChange={(event) => setcandidateId(event.target.value)}
                >
                    {data && data?.candidates.map((candidate, index) => (
                        <FormControlLabel key={index} value={candidate.id} control={<Radio />} label={candidate.name} />
                    ))}
                </RadioGroup>
                </FormControl>}
            </CardContent>
            {!completed && data && <CardActions sx={{ justifyContent: 'center', marginBottom: '20px' }}>
                <Button variant='contained' onClick={() => setCompleted(true)}>Vote</Button>
            </CardActions>}
        </Card>
    </div>
  )
}

export default DetailsPage