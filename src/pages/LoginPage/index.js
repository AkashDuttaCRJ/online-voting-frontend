import "./LoginPage.css"
import InputBlock from "../../components/InputBlock"
import PrimaryButton from "../../components/PrimaryButton"
import SecondaryButton from "../../components/SecondaryButton"
import { useNavigate } from "react-router-dom"
import OtpDialog from "../../components/OtpDialog"
import { useEffect, useState } from "react"
import { InputAdornment } from "@mui/material"

const LoginPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpValue, setOtpValue] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [dataError, setDataError] = useState('')
  const [otpError, setOtpError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      navigate('/', { replace: true });
      return
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const sendotp = async (phone) => {
    try {
      setDataError('');
      setLoading(true);
      const resp = await (await fetch('https://instavote-be.herokuapp.com/getotp', {
        headers: {
          'phone': phone,
          'type': 'login'
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

  const loginuser = async (phone, otp) => {
    try {
      setOtpError('');
      setOtpLoading(true);
      const resp = await (await fetch('https://instavote-be.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'phoneNumber': phone,
          'otp': otp
        })
      })).json();
      if(resp.token) {
        setOtpError('');
        setOtpLoading(false);
        setOpenDialog(false);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('data', JSON.stringify(resp.data));
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
    <div className="login-container">
      <div className="login-form">
        <div className="login-title">Login</div>
        <InputBlock 
          label='Phone No' 
          type='text' 
          required 
          autofocus
          error={dataError !== '' && dataError}
          value={phoneNumber}
          setValue={setPhoneNumber}
          startAdornment={<InputAdornment position="start">+91 </InputAdornment>}
        />
        <PrimaryButton title='Login' onClick={() => sendotp(phoneNumber)} disabled={phoneNumber === '' || phoneNumber.length < 10} loading={loading} />
        <div className="divider">OR</div>
        <div>Don't have an account? <SecondaryButton title='sign up' onClick={() => navigate('/signup', { replace: true })} /></div>
      </div>
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
        primaryBtnFunc={() => loginuser(phoneNumber, otpValue)}
        secondaryBtnFunc={() => sendotp(phoneNumber)}
      />)}
    </div>
  )
}

export default LoginPage