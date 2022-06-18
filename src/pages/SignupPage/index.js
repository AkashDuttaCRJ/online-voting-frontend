import './SignupPage.css'
import InputBlock from "../../components/InputBlock"
import PrimaryButton from "../../components/PrimaryButton"
import SecondaryButton from '../../components/SecondaryButton'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, InputAdornment } from '@mui/material'
import { useEffect, useState } from 'react'
import OtpDialog from '../../components/OtpDialog'

const SignupPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('')
  const [voterId, setVoterId] = useState('')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [otpValue, setOtpValue] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [dataError, setDataError] = useState('')
  const [otpError, setOtpError] = useState('')

  useEffect(() => {
    const getVoterData = async () => {
      setName('');
      setAddress('');
      setPhoneNumber('');
      const resp = await (await fetch(`https://instavote-be.herokuapp.com/getvoterdata?voterId=${voterId}`)).json();
      setName(resp?.fullName);
      setAddress(resp?.address);
      setPhoneNumber(resp?.mobile);
      console.log(resp)
    }
    voterId !== '' && getVoterData();
  },[voterId])

  const sendotp = async (phone) => {
    try {
      setDataError('');
      setLoading(true);
      const resp = await (await fetch('https://instavote-be.herokuapp.com/getotp', {
        headers: {
          'phone': phone,
          'type': 'signup'
        }
      })).json();
      if(resp.error) {
        setDataError(resp.error);
        setLoading(false);
        return ;
      }
      if(resp.data) setOpenDialog(true);
      setLoading(false);
    } catch(e) {
      setLoading(false);
      setDataError('Something went wrong');
    }
  }

  const signupuser = async (voterid, fullName, address, phone, otp) => {
    try {
      setOtpError('');
      setOtpLoading(true);
      const resp = await (await fetch('https://instavote-be.herokuapp.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'voterId': voterid,
          'fullName': fullName,
          'address': address,
          'phoneNumber': phone,
          'otp': otp
        })
      })).json();
      if(resp.token) {
        setOtpError('');
        setOtpLoading(false);
        setOpenDialog(false);
        navigate('/', { replace: true });
      }
      if(resp.data.response_code === 'rejected') {
        setOtpError('Invalid OTP!');
        setOtpLoading(false);
        return ;
      }
    } catch(e) {
      setOtpLoading(false);
      setOtpError('Something went wrong');
    }
  }

  return (
    <div className="signup-container">
        <Card sx={{ maxWidth: '60%' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingInline: '8rem', paddingBlock: '4rem' }}>
            <div className="signup-title">Sign Up</div>
            <InputBlock label='Voter ID' type='text' required value={voterId} setValue={setVoterId} />
            <InputBlock label='Full Name' type='text' disabled required value={name} setValue={setName} />
            <InputBlock label='Address' type='text' disabled required value={address} setValue={setAddress} />
            <InputBlock 
              label='Phone No' 
              type='text' 
              required
              error={dataError !== '' && dataError}
              value={phoneNumber}
              setValue={setPhoneNumber}
              startAdornment={<InputAdornment position="start">+91 </InputAdornment>}
            />
            <PrimaryButton title='Sign Up' onClick={() => sendotp(phoneNumber)} disabled={phoneNumber === '' || !phoneNumber || phoneNumber?.length < 10} loading={loading} />
            <div className="divider">OR</div>
            <div>Already have an account? <SecondaryButton title='Login' onClick={() => navigate('/login', { replace: true })} /></div>
          </CardContent>
        </Card>
        {openDialog && (
        <OtpDialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)} 
          phoneNo={phoneNumber} 
          otpValue={otpValue}
          setOtpValue={setOtpValue}
          error={otpError}
          setError={setOtpError}
          loading={otpLoading}
          primaryBtnFunc={() => signupuser(voterId, name, address, phoneNumber, otpValue)}
          secondaryBtnFunc={() => sendotp(phoneNumber)}
        />)}
    </div>
  )
}

export default SignupPage