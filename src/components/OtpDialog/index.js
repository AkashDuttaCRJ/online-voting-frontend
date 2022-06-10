import { Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, OutlinedInput, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PrimaryButton from '../PrimaryButton'
import SecondaryButton from '../SecondaryButton'

const OtpDialog = ({ open, onClose, phoneNo, otpValue, setOtpValue, error, setError, loading, primaryBtnFunc, secondaryBtnFunc }) => {
    const [timer, setTimer] = useState(10);

    useEffect(() => {
        const countdown = setInterval(() => {
            timer > 0 && setTimer((timer) => timer - 1)
        }, 1000)

        return () => {
            clearInterval(countdown)
        }
    },[timer])

    useEffect(() => {
        setOtpValue('')
        setError('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <Dialog 
    open={open} 
    onClose={onClose} 
    aria-labelledby='otp-popup-title'
    aria-describedby='otp-popup-desc'
    maxWidth='sm'
    >
        <DialogTitle id='otp-popup-title'>Verify your phone number</DialogTitle>
        <DialogContent>
            <DialogContentText id='otp-popup-desc' marginBottom={2}>Please enter the OTP sent to <b>+91{phoneNo}</b>. Your OTP will be valid for 5 minutes.</DialogContentText>
            <Stack direction='row' spacing={2} justifyContent='center'>
                <FormControl error={error && true} sx={{ width: '250px' }}>
                    <OutlinedInput
                        id="otp-input"
                        autoFocus
                        inputProps={{ maxLength: 5, style: { textAlign: 'center', fontWeight: 'bold', fontSize: '20px', letterSpacing: '10px'} }}
                        value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value)}
                        aria-describedby="otp-error-text"
                    />
                    {error && <FormHelperText id="otp-error-text">{error}</FormHelperText>}
                </FormControl>
            </Stack>
            <Stack alignItems='center'>
                <PrimaryButton 
                    title='verify' 
                    loading={loading}
                    onClick={primaryBtnFunc} 
                    disabled={otpValue.length < 5}
                />
                <SecondaryButton 
                    title={'resend otp' + (timer === 0 ? '' : ' in ' + timer)} 
                    onClick={() => {
                        secondaryBtnFunc();
                        setTimer(10);
                    }} 
                    disabled={timer !== 0}
                />
            </Stack>
        </DialogContent>
    </Dialog>
  )
}

export default OtpDialog