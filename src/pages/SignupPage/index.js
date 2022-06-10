import './SignupPage.css'
import InputBlock from "../../components/InputBlock"
import PrimaryButton from "../../components/PrimaryButton"
import SecondaryButton from '../../components/SecondaryButton'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, InputAdornment } from '@mui/material'
import { useState } from 'react'

const SignupPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <div className="signup-container">
        <Card sx={{ maxWidth: '60%' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingInline: '8rem', paddingBlock: '4rem' }}>
            <div className="signup-title">Sign Up</div>
            <InputBlock label='Voter ID' type='text' required />
            <InputBlock label='Full Name' type='text' disabled required />
            <InputBlock label='Address' type='text' disabled required />
            <InputBlock 
              label='Phone No' 
              type='text' 
              required
              startAdornment={<InputAdornment position="start">+91 </InputAdornment>}
            />
            <PrimaryButton title='Sign Up' />
            <div className="divider">OR</div>
            <div>Already have an account? <SecondaryButton title='Login' onClick={() => navigate('/login', { replace: true })} /></div>
          </CardContent>
        </Card>
    </div>
  )
}

export default SignupPage